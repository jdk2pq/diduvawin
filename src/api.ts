import { ESPN_TEAM_ID } from './constants';

/**
 * Returns the ESPN API Schedule URL depending on the sport
 * @param sport
 */
export const getScheduleUrl = (sport: string): string => {
    let fullSportName = `college-${sport}`;
    if (sport === 'basketball') {
        fullSportName = `mens-${fullSportName}`;
    }
    return `http://site.api.espn.com/apis/site/v2/sports/${sport}/${fullSportName}/teams/${ESPN_TEAM_ID}/schedule`;
};
