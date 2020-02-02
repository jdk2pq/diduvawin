import { Request, Response } from 'express';
import request from 'request';

import { ESPN_TEAM_ID } from './constants';
import { getMostRecentEvent } from './helpers';
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
            const footballSchedule: IESPNSchedule = JSON.parse(footballBody);
            const basketballSchedule: IESPNSchedule = JSON.parse(basketballBody);
            const mostRecentEvent: IESPNPastEvent = getMostRecentEvent(footballSchedule.events.concat(basketballSchedule.events));

            let status = 'NOT YET';
            if (mostRecentEvent.competitions[0].status.type.completed) {
                const winner = mostRecentEvent.competitions[0].competitors.find((competitor) => competitor.winner);
                // The winner may not be available yet if the game completed within the last few minutes
                if (winner) {
                    if (winner.id === ESPN_TEAM_ID) {
                        status = 'YES';
                    } else {
                        status = 'NO';
                    }
                }
            }
            let score: number;
            let competitorObject: IESPNCompetitorsJSON;
            let competitor: string;
            let competitorScore: number;
            let us: IESPNPastCompetitorsJSON | IESPNCurrentCompetitorsJSON =
                mostRecentEvent.competitions[0].competitors.find((competitor) => competitor.id === ESPN_TEAM_ID);
            const summaryLinkFound = mostRecentEvent.links.find(
                (link) => (link.rel.includes('now') || link.rel.includes('recap') || link.rel.includes('live')) && link.rel.includes('desktop')
            );
            let summaryLink = '#';
            if (summaryLinkFound) {
                summaryLink = summaryLinkFound.href;
            }


            if (us.score) {
                // Game is complete
                score = us.score.value;
                competitorObject = mostRecentEvent.competitions[0].competitors.find((competitor) => competitor.id !== ESPN_TEAM_ID);
                competitor = competitorObject.team.abbreviation;
                competitorScore = competitorObject.score.value;
                render(res, summaryLink, status, score, competitor, competitorScore);
            } else {
                // Game is currently happening, so we need to make a separate request since the schedule doesn't have current scores
                request(
                    getCurrentGameUrl(
                        summaryLink.includes('basketball') ? 'basketball' : 'football',
                        mostRecentEvent.id
                    ),
                    (err, response, body: string) => {
                        const event: IESPNCurrentEvent = JSON.parse(body);
                        us = event.competitions[0].competitors.find((competitor) => competitor.id === ESPN_TEAM_ID);
                        score = +us.score;
                        competitorObject = event.competitions[0].competitors.find((competitor) => competitor.id !== ESPN_TEAM_ID);
                        competitor = competitorObject.team.abbreviation;
                        competitorScore = +competitorObject.score;
                        render(res, summaryLink, status, score, competitor, competitorScore);
                    }
                );
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
    competitorScore: number
) => {
    res.render('pages/index', {
        summaryLink,
        status,
        score,
        competitor,
        competitorScore,
    });
};