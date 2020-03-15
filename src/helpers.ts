import moment from 'moment-timezone';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';

import { IESPNPastEvent } from './interfaces';

/**
 * Returns the most recent game that is not in the future
 */
export const getMostRecentEvent = (events: Array<IESPNPastEvent>): IESPNPastEvent => {
    const today = moment();
    return maxBy(
        events.filter((event: IESPNPastEvent) => {
            return moment(event.date).isBefore(today);
        }),
        game => moment(game.date).valueOf()
    );
};

/**
 * Returns the next event string
 */
export const getNextEvent = (events: Array<IESPNPastEvent>): string => {
    const today = moment();
    const nextEvent = minBy(
        events.filter((event: IESPNPastEvent) => {
            return moment(event.date).isAfter(today);
        }),
        game => moment(game.date).valueOf()
    );
    const nextDate = moment(nextEvent.date);
    let date = nextDate.tz('America/New_York').format('M/DD');
    if (today.format('M/DD') === date) {
        date = `today at ${nextDate.tz('America/New_York').format('h:mma z')}`;
    } else {
        date = `on ${date}`;
    }
    const sport = nextEvent.competitions[0].competitors[0].team.links[0].href.includes('basketball')
        ? "Men's Basketball"
        : 'Football';
    return `${sport} ▸ ${nextEvent.shortName} ${date}`;
};
