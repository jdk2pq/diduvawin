import { Request, Response } from 'express';
import request from 'request';

import { ESPN_TEAM_ID } from './constants';
import { getMostRecentEvent } from './helpers';
import { getScheduleUrl } from './api';
import { IESPNEvent, IESPNSchedule } from './interfaces';

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
			const mostRecentEvent: IESPNEvent = getMostRecentEvent(footballSchedule.events.concat(basketballSchedule.events));

			let status = 'NOT YET';
			if (mostRecentEvent.competitions[0].status.type.completed) {
				const winner = mostRecentEvent.competitions[0].competitors.find((competitor) => competitor.winner);
				if (winner.id === ESPN_TEAM_ID) {
					status = 'YES';
				} else {
					status = 'NO';
				}
			}

			const score = mostRecentEvent.competitions[0].competitors.find((competitor) => competitor.id === ESPN_TEAM_ID).score.value;
			const competitorObject = mostRecentEvent.competitions[0].competitors.find((competitor) => competitor.id !== ESPN_TEAM_ID);
			const competitor = competitorObject.team.abbreviation;
			const competitorScore = competitorObject.score.value;
			const summaryLink = mostRecentEvent.links.find((link) => link.rel.includes('summary') && link.rel.includes('desktop')).href;

			res.render('pages/index', {
				summaryLink,
				status,
				score,
				competitor,
				competitorScore,
			});
		});
	});
};
