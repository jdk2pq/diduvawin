import * as express from 'express';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { ESPNTeamID, games, timezone } from './config';
import * as request from 'request';
import { ESPNScoreboardJSON } from './interfaces';
import maxBy = require('lodash/maxBy');

moment.tz.setDefault(timezone);

const app = express();

/**
 * Returns the ESPN API URL to call, using the gameID as a parameter
 * @param gameId
 */
const getUrl = (gameId: string): string => {
  return `http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard/${gameId}`;
};

/**
 * Returns the most recent game that is not in the future.
 */
const getMostRecentGameId = (): string => {
  const today = moment();
  return maxBy(
    games.filter( (game) => {
      return game.date.isBefore(today);
    }),
    (game) => game.date.valueOf(),
  ).gameId.toString();
};

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
  request(getUrl(getMostRecentGameId()), (errorO, responseO, bodyOStr: string) => {
    let bodyO: ESPNScoreboardJSON = JSON.parse(bodyOStr);
    let yesNoOrNotYet = 'NOT YET';
    if (bodyO.status.type.completed) {
      const winner = bodyO.competitions[0].competitors.find((competitor) => competitor.winner);
      if (winner.id === ESPNTeamID) {
        yesNoOrNotYet = 'YES';
      } else {
        yesNoOrNotYet = 'NO';
      }
    }
    const score = +bodyO.competitions[0].competitors.find((competitor) => competitor.id === ESPNTeamID).score;
    const rawCompetitor = bodyO.competitions[0].competitors.find((competitor) => competitor.id !== ESPNTeamID);
    const competitor = rawCompetitor.team.abbreviation;
    const competitorScore = +rawCompetitor.score;
    res.render('pages/index', {
      link: bodyO.links.find((link) => link.rel[0] === 'summary').href,
      yesNoOrNotYet,
      score,
      competitor,
      competitorScore,
    });
  });
});

app.listen(app.get('port'), () => {
  // console.log('Node app is running on port', app.get('port'));
});
