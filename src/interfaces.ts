/**
 * Interfaces for JSON returned from the ESPN API
 */

export interface IESPNScoreboardLinkJSON {
  href: string;
  rel: string[];
}

export interface IESPNScoreboardCompetitorsJSON {
  score: {
  	value: number;
  	displayValue: string;
	};
  winner: boolean;
  id: string;
  team: {
    abbreviation: string;
  }
}

export interface IESPNScoreboardCompetitionJSON {
	attendance: number;
	boxscoreAvailable: boolean;
  competitors: Array<IESPNScoreboardCompetitorsJSON>;
  date: string;
  id: string;
  neutralSite: boolean;
  notes: Array<any>;
  status: {
  	clock: number;
  	displayClock: string;
  	period: string;
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
	ticketsAvailable: boolean;
	timeValid: boolean;
	type: {
		id: string;
		text: string;
		abbreviation: string;
	};
	venue: {
		address: {
			city: string;
			state: string;
			zipCode: string;
		};
		fullName: string;
	}
}

export interface IESPNEvent {
	competitions: Array<IESPNScoreboardCompetitionJSON>;
	date: string;
	id: number;
	links: IESPNScoreboardLinkJSON[];
	name: string;
	season: {
		year: number;
		displayName: string;
	}
	seasonType: {
		id: string;
		type: number;
		name: string;
		abbreviation: string;
	}
  shortName: string;
  timeValid: boolean;
	week: {
  	number: number;
  	text: string;
	}
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

export interface IESPNSchedule {
	events: Array<IESPNEvent>;
	requestedSeason: {
		year: number;
		type: number;
		name: string;
		displayName: string;
	};
	season: {
		year: number;
		type: number;
		name: string;
		displayName: string;
	};
	status: string;
	team: {
		abbreviation: string;
		clubhouse: string;
		color: string;
		displayName: string;
		groups: {
			id: string;
			parent: {
				id: string;
			};
			isConference: boolean;
		};
		id: string;
		location: string;
		logo: string;
		name: string;
		recordSummary: string;
		seasonSummary: string;
		standingSummary: string;
		venueLink: string;
	}
	timestamp: string;
}
