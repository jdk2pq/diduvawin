"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment-timezone");
exports.ESPNTeamID = '258';
exports.timezone = 'America/New_York';
moment.tz.setDefault(exports.timezone);
exports.games = [
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
];
//# sourceMappingURL=config.js.map