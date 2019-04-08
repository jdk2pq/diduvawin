import * as moment from 'moment-timezone';
import { IGame } from './interfaces';

export const ESPNTeamID: string = '258'; // UVA Men's Basketball ID
export const timezone = 'America/New_York';
moment.tz.setDefault(timezone);

/**
 * Array of ESPN game ID's and start times of the games
 */
export const games: IGame[] = [
  {
    date: moment('2019-03-04 12:00'),
    gameId: 401082779,
  },
  {
    date: moment('2019-03-09 16:00'),
    gameId: 401082780
  },
  {
    date: moment('2019-03-14 12:30'),
    gameId: 401120700
  },
  {
    date: moment('2019-03-15 19:00'),
    gameId: 401120704
  },
  {
    date: moment('2019-03-22 15:10'),
    gameId: 401123412
  },
  {
    date: moment('2019-03-24 19:55'),
    gameId: 401123424
  },
  {
    date: moment('2019-03-28 21:57'),
    gameId: 401123381
  },
  {
    date: moment('2019-03-30 20:49'),
    gameId: 401123383
  },
  {
    date: moment('2019-04-06 18:09'),
    gameId: 401123375
  },
  {
    date: moment('2019-04-08 21:20'),
    gameId: 401123374
  },
];
