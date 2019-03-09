import * as moment from 'moment-timezone';

export interface IGame {
  date: moment.Moment;
  gameId: number;
}

export interface ESPNScoreboardLinkJSON {
  href: string;
  rel: string[];
}

export interface ESPNScoreboardCompetitorsJSON {
  linescores: Array<{ value: number }>;
  score: string;
  winner: boolean;
  id: string;
  team: {
    abbreviation: string;
  }
}

export interface ESPNScoreboardCompetitionJSON {
  competitors: ESPNScoreboardCompetitorsJSON[];
}

export interface ESPNScoreboardJSON {
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