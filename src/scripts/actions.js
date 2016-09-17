export const START_GAME = 'START_GAME'
export const NEXT_ROUND = 'NEXT_ROUND'
export const SET_RESULT = 'SET_RESULT'
export const END_GAME = 'END_GAME'

export const creators = {
	[START_GAME]: function () {
		return {
			type: START_GAME
		}
	},
	[NEXT_ROUND]: function () {
		return {
			type: NEXT_ROUND
		}
	},
	[SET_RESULT]: function (result) {
		return {
			type: SET_RESULT,
			result: result
		}
	},
	[END_GAME]: function () {
		return {
			type: END_GAME
		}
	}
}