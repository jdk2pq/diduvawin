"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var moment = require("moment");
var config_1 = require("./config");
var request = require("request");
var maxBy = require("lodash/maxBy");
moment.tz.setDefault(config_1.timezone);
var app = express();
var getUrl = function (gameId) {
    return "http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard/" + gameId;
};
var getMostRecentGameId = function () {
    var today = moment();
    return maxBy(config_1.games.filter(function (game) {
        return game.date.isBefore(today);
    }), function (game) { return game.date.valueOf(); }).gameId.toString();
};
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    request(getUrl(getMostRecentGameId()), function (errorO, responseO, bodyOStr) {
        var bodyO = JSON.parse(bodyOStr);
        var yesNoOrNotYet = 'NOT YET';
        if (bodyO.status.type.completed) {
            var winner = bodyO.competitions[0].competitors.find(function (competitor) { return competitor.winner; });
            if (winner.id === config_1.ESPNTeamID) {
                yesNoOrNotYet = 'YES';
            }
            else {
                yesNoOrNotYet = 'NO';
            }
        }
        var score = +bodyO.competitions[0].competitors.find(function (competitor) { return competitor.id === config_1.ESPNTeamID; }).score;
        var rawCompetitor = bodyO.competitions[0].competitors.find(function (competitor) { return competitor.id !== config_1.ESPNTeamID; });
        var competitor = rawCompetitor.team.abbreviation;
        var competitorScore = +rawCompetitor.score;
        res.render('pages/index', {
            link: bodyO.links.find(function (link) { return link.rel[0] === 'summary'; }).href,
            yesNoOrNotYet: yesNoOrNotYet,
            score: score,
            competitor: competitor,
            competitorScore: competitorScore,
        });
    });
});
app.listen(app.get('port'), function () {
});
//# sourceMappingURL=index.js.map