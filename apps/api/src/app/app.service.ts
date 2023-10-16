import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { fraction, number, random, round } from 'mathjs';

import { bookmakers } from './data';
import { capitalize } from './utils';

export type Market = {
	bets: Bet[];
	bookmakers: Bookmaker[];
	displayName: string;
	marketId: number;
};

export type Bet = {
	displayName: string;
	marketId: number;
	odds: Odds[];
};

export type Bookmaker = {
	bookmakerCode: string;
	bookmakerName: string;
};

export type Odds = {
	betId: number;
	betName: string;
	bookmakerCode: string;
	odds: string;
	oddsDecimal: string;
};

@Injectable()
export class AppService {
	getMarket(): Market {
		const marketId = round(random(3333333333, 9999999999));
		const randomHomeTeam = faker.word.noun();
		const homeTeam = capitalize(randomHomeTeam);
		const randomAwayTeam = faker.word.noun();
		const awayTeam = capitalize(randomAwayTeam);

		const bets = [];

		for (let i = 0; i < 2; i++) {
			const betId = round(random(11111, 99999));
			const odds = [];

			for (const bookmaker of bookmakers) {
				const randomFractionString = `${round(random(1, 5))}/${round(
					random(6, 10),
				)}`;
				const randomFraction = fraction(randomFractionString);
				const oddsFractional = `${randomFraction.n}/${randomFraction.d}`;
				const oddsDecimal = number(randomFraction).toFixed(2);

				odds.push({
					betId,
					betName: capitalize(faker.word.noun()),
					bookmakerCode: bookmaker.bookmakerCode,
					odds: oddsFractional,
					oddsDecimal,
				});
			}

			bets.push({
				displayName: i === 0 ? homeTeam : awayTeam,
				odds,
				marketId,
			});
		}

		return {
			bets,
			bookmakers,
			displayName: "Win Market",
			marketId,
		};
	}
}
