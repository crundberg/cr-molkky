import { calcPlayerScore, calcPlayerDisqualified } from '../utils';

describe('calculate players score', () => {
	it('adds all points', () => {
		const player = { points: [] };

		let score = calcPlayerScore(player);
		expect(score).toBe(0);

		player.points.push(12);
		score = calcPlayerScore(player);
		expect(score).toBe(12);

		player.points.push(5);
		score = calcPlayerScore(player);
		expect(score).toBe(17);

		player.points.push(10);
		score = calcPlayerScore(player);
		expect(score).toBe(27);
	});

	it('set points to 25 if score is greater than 50', () => {
		const player = { points: [12, 12, 12, 12] };

		let score = calcPlayerScore(player);
		expect(score).toBe(48);

		player.points.push(3);
		score = calcPlayerScore(player);
		expect(score).toBe(25);

		player.points.push(5);
		score = calcPlayerScore(player);
		expect(score).toBe(30);
	});
});

describe('calculate if player is disqualified', () => {
	it('returns false if less than 3 throws', () => {
		const player = { points: [] };

		let isDisqualified = calcPlayerDisqualified(player);
		expect(isDisqualified).toBeFalsy();

		player.points.push(0);
		player.points.push(0);
		isDisqualified = calcPlayerDisqualified(player);
		expect(isDisqualified).toBeFalsy();
	});

	it('returns true if three misses in a row', () => {
		const player = { points: [0, 0], handicap: false };

		let isDisqualified = calcPlayerDisqualified(player);
		expect(isDisqualified).toBeFalsy();

		player.points.push(0);
		isDisqualified = calcPlayerDisqualified(player);
		expect(isDisqualified).toBeTruthy();
	});

	it('returns true if three misses in a row', () => {
		const player = { points: [12, 0, 1, 5, 0, 0, 4, 0, 0], handicap: false };

		let isDisqualified = calcPlayerDisqualified(player);
		expect(isDisqualified).toBeFalsy();

		player.points.push(0);
		isDisqualified = calcPlayerDisqualified(player);
		expect(isDisqualified).toBeTruthy();
	});

	it('returns false if three misses in a row with handicap', () => {
		const player = { points: [0, 0], handicap: true };

		let isDisqualified = calcPlayerDisqualified(player);
		expect(isDisqualified).toBeFalsy();

		player.points.push(0);
		isDisqualified = calcPlayerDisqualified(player);
		expect(isDisqualified).toBeFalsy();
	});
});
