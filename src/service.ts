import { Request, Response } from 'express';
import request from 'request';

import { ESPN_TEAM_ID, STATUSES } from './constants';
import { getMostRecentEvent, getNextEvent } from './helpers';
import { getCurrentGameUrl, getScheduleUrl } from './api';
import {
    IESPNCompetitorsJSON,
    IESPNCurrentCompetitorsJSON,
    IESPNCurrentEvent,
    IESPNPastCompetitorsJSON,
    IESPNPastEvent,
    IESPNSchedule,
} from './interfaces';

/**
 * Render function for the root of the application.
 *
 * Makes two requests for football and men's basketball schedules, finds the most recent event
 * (or the current one happening), and determines if we won the game (statuses are NOT YET, YES, or NO).
 * @param req
 * @param res
 */
export const didWeWin = (req: Request, res: Response) => {
    request(getScheduleUrl('football'), (footballError, footballResponse, footballBody: string) => {
        request(getScheduleUrl('basketball'), (basketballError, basketballResponse, basketballBody: string) => {
            let status ='NOT YET';
            let score: number = 0;
            let competitorScore: number = 0;
            let competitorObject: IESPNCompetitorsJSON;
            let competitor: string = '';
            let summaryLink = '#';

            const footballSchedule: IESPNSchedule = JSON.parse(footballBody);
            const basketballSchedule: IESPNSchedule = JSON.parse(basketballBody);
            const concatenatedEvents = footballSchedule.events.concat(basketballSchedule.events);
            const nonCanceledEvents = concatenatedEvents.filter(
                e => e.competitions[0].status.type.name !== STATUSES.CANCELED
            );
            const mostRecentEvent: IESPNPastEvent = getMostRecentEvent(nonCanceledEvents);
            const nextEventStr = getNextEvent(nonCanceledEvents);

            if (mostRecentEvent) {
                if (mostRecentEvent.competitions[0].status.type.completed) {
                    const winner = mostRecentEvent.competitions[0].competitors.find(competitor => competitor.winner);
                    // The winner may not be available yet if the game completed within the last few minutes
                    if (winner) {
                        if (winner.id === ESPN_TEAM_ID) {
                            status = 'YES';
                        } else {
                            status = 'NO';
                        }
                    }
                }

                let us:
                    | IESPNPastCompetitorsJSON
                    | IESPNCurrentCompetitorsJSON = mostRecentEvent.competitions[0].competitors.find(
                    competitor => competitor.id === ESPN_TEAM_ID
                );

                const summaryLinkFound = mostRecentEvent.links.find(
                    link =>
                        (link.rel.includes('now') ||
                            link.rel.includes('recap') ||
                            link.rel.includes('live') ||
                            link.rel.includes('summary')) &&
                        link.rel.includes('desktop')
                );
                if (summaryLinkFound) {
                    summaryLink = summaryLinkFound.href;
                }
                competitorObject = mostRecentEvent.competitions[0].competitors.find(
                    competitor => competitor.id !== ESPN_TEAM_ID
                );
                competitor = competitorObject.team.abbreviation;

                if (us.score) {
                    // Game is complete
                    score = us.score.value;
                    competitorScore = competitorObject.score.value;
                    render(res, summaryLink, status, score, competitor, competitorScore, nextEventStr);
                } else {
                    // Game is currently happening, so we need to make a separate request since the schedule doesn't have current scores
                    request(
                        getCurrentGameUrl(
                            summaryLink.includes('basketball') ? 'basketball' : 'football',
                            mostRecentEvent.id
                        ),
                        (err, response, body: string) => {
                            let time;
                            if (!err && response.statusCode === 200) {
                                const event: IESPNCurrentEvent = JSON.parse(body);
                                us = event.competitions[0].competitors.find(competitor => competitor.id === ESPN_TEAM_ID);
                                score = +us.score;
                                competitorObject = event.competitions[0].competitors.find(
                                    competitor => competitor.id !== ESPN_TEAM_ID
                                );
                                competitorScore = +competitorObject.score;
                                time = event.status.type.shortDetail;
                            }
                            render(res, summaryLink, status, score, competitor, competitorScore, nextEventStr, time);
                        }
                    );
                }
            } else {
                render(res, summaryLink, status, score, competitor, competitorScore, nextEventStr);
            }
        });
    });
};

export const render = (
    res: Response,
    summaryLink: string,
    status: string,
    score: number,
    competitor: string,
    competitorScore: number,
    nextEvent: string,
    time?: string
) => {
    res.render('pages/index', {
        summaryLink,
        status,
        score,
        competitor,
        competitorScore,
        nextEvent,
        time,
    });
};
