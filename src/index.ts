import * as express from 'express';
import {Request, Response} from 'express';
import * as moment from 'moment';
import {games} from './games';
import maxBy = require('lodash/maxBy');
import filter = require('lodash/filter');
import * as request from 'request';

interface ESPNScoreboardLinkJSON {
    href: string;
    rel: string[];
}

interface ESPNScoreboardCompetitorsJSON {
    linescores: Array<{value: number}>;
    score: string;
    winner: boolean;
    id: string;
    team: {
      abbreviation: string;
    }
}

interface ESPNScoreboardCompetitionJSON {
    competitors: ESPNScoreboardCompetitorsJSON[];
}

interface ESPNScoreboardJSON {
    name: string;
    id: number;
    links: ESPNScoreboardLinkJSON[];
    date: string;
    shortName: string;
    competitions: ESPNScoreboardCompetitionJSON[];
    status: {
        clock: number;
        displayClock: string;
        period: number;
        type: {
            completed: boolean;
            description: string;
            detail: string;
            id: string;
            name: string;
            shortDetail: string;
            state: string;
        }
    };
}

const UVABasketballID = '258';
const app = express();

const today = moment();

const getUrl = (gameId: string): string => {
    return `http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard/${gameId}`;
};

const getMostRecentGameId = (): string => {
    return maxBy(
        filter(games, (game) => {
            return game.date.valueOf() <= today.valueOf();
        }),
        (game) => game.date.valueOf()
    ).gameId.toString();
};


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
    request(getUrl(getMostRecentGameId()), (errorO, responseO, bodyOStr: string) => {
        let bodyO: ESPNScoreboardJSON = JSON.parse(bodyOStr);
        let yesNoOrNotYet = 'NOT YET';
        if (bodyO.status.type.completed) {
            const winner = bodyO.competitions[0].competitors.find((competitor) => competitor.winner);
            if (winner.id === UVABasketballID) {
                yesNoOrNotYet = 'YES';
            } else {
                yesNoOrNotYet = 'NO';
            }
        }
        const uvaScore = +bodyO.competitions[0].competitors.find((competitor) => competitor.id === UVABasketballID).score;
        const rawCompetitor = bodyO.competitions[0].competitors.find((competitor) => competitor.id !== UVABasketballID);
        const competitor = rawCompetitor.team.abbreviation;
        const competitorScore = +rawCompetitor.score;
        res.render('pages/index', {
            link: bodyO.links.find((link) => link.rel[0] === 'summary').href,
            yesNoOrNotYet,
            uvaScore,
            competitor,
            competitorScore
        });
    });
});

app.listen(app.get('port'), () => {
    // console.log('Node app is running on port', app.get('port'));
});
