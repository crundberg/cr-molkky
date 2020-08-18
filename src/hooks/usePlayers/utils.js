export const isPlayerLeft = (player) =>
	player.currentPoints !== 50 && !player.disqualified;

export const getCurrentRound = (players) => {
	return players.reduce((rounds, player) => {
		if (player.points.length > rounds) return player.points.length;

		return rounds;
	}, 0);
};

export const isNewRound = (players, currentRound) => {
	return players.filter(isPlayerLeft).every((player) => {
		return player.points.length === currentRound;
	});
};

export const getRoundColumns = (currentRound, newRound) => {
	if (currentRound < 4) {
		return [1, 2, 3, 4];
	}

	const columns = [];
	const roundToShow = newRound ? currentRound + 1 : currentRound;

	for (let round = roundToShow - 3; round <= roundToShow; round += 1) {
		columns.push(round);
	}

	return columns;
};

export const getPlayersTurn = (players) => {
	return players.filter(isPlayerLeft).reduce((turn, player) => {
		if (!turn.points) return player;

		const turnLength = turn.points.length;
		const playerLength = player.points.length;

		if (turnLength > playerLength) return player;
		if (turnLength < playerLength) return turn;
		if (player.currentPoints < turn.currentPoints) return player;

		return turn;
	}, {});
};

export const getPlayersByScore = (players, newRound) => {
	return players.sort((a, b) => {
		let comparison = 0;

		if (!newRound) return 0; // Sort after a complete round

		if (!a.disqualified && b.disqualified) {
			comparison = -1;
		} else if (a.disqualified && !b.disqualified) {
			comparison = 1;
		} else if (a.currentPoints > b.currentPoints) {
			comparison = -1;
		} else if (a.currentPoints < b.currentPoints) {
			comparison = 1;
		}

		return comparison;
	});
};

export const calcPlayerScore = (player) => {
	return player.points.reduce((score, points) => {
		const newScore = score + points;
		return newScore > 50 ? 25 : newScore;
	}, 0);
};

export const calcPlayerDisqualified = (player) => {
	if (player.points.length < 3 || player.handicap) return false;

	return player.points.slice(-3).every((point) => {
		return point === 0;
	});
};
