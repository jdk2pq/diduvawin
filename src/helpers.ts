import moment from 'moment';
import maxBy from 'lodash/maxBy';

import { IESPNEvent } from './interfaces';

/**
 * Returns the most recent game that is not in the future
 */
export const getMostRecentEvent = (events: Array<IESPNEvent>): IESPNEvent => {
    const today = moment();
    return maxBy(
        events.filter((event: IESPNEvent) => {
            return moment(event.date).isBefore(today);
        }),
        (game) => moment(game.date).valueOf(),
    );
};
