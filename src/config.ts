import * as moment from 'moment-timezone';
import { IGame } from './interfaces';

export const ESPNTeamID: string = '258'; // UVA Men's Basketball ID
const timezone = 'America/New_York';

/**
 * Array of ESPN game ID's and start times of the games
 */
export const games: IGame[] = [
  {
    date: moment.tz('2019-03-04 12:00', timezone),
    gameId: 401082779,
  },
  {
    date: moment.tz('2019-03-09 16:00', timezone),
    gameId: 401082780
  },
];
