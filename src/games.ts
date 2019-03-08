import * as moment from 'moment-timezone';

export interface IGame {
    date: moment.Moment;
    gameId: number;
}

export const games: IGame[] = [
    {
        date: moment.tz('2019-03-04 12:00', 'America/New_York'),
        gameId: 401082779
    },
    {
        date: moment.tz('2019-03-09 16:00', 'America/New_York'),
        gameId: 401082780
    }
];
