import moment from 'moment';
import maxBy from 'lodash/maxBy';

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
