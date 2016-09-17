import m from 'mithril'
import {createStore} from 'redux'
import {random, sample, defer} from 'underscore'
import {assign} from './utils'
import {
	START_GAME,
	SET_RESULT,
	NEXT_ROUND,
	END_GAME
} from './actions'

const initialState = {
	mode: 'MENU', // MENU | GAME | END
	operandA: 2,
	operandB: 2,
	result: 4,
	expected: 4,
	horizantal: false,
	progress: 1,
	record: '[]'
}

const store = createStore( (state = initialState, action) => {
	m.startComputation()
	defer(function () {m.endComputation()})
	switch (action.type) {
		case START_GAME:
			var a = getOperand()
			var b = getOperand()

			return assign({}, state, {
				mode: 'GAME',
				operandA: a,
				operandB: b,
				result: null,
				expected: a + b,
				progress: 1,
				horizantal: false,
				record: '[]'
			})

		case END_GAME: 
			return assign({}, state, {
				mode: 'END'
			})

		case SET_RESULT:
			console.log('SET RESULT')
			return assign({}, state, {
				result: action.result
			})

		case NEXT_ROUND:
			console.log('NEXT ROUND')
			var a = getOperand()
			var b = getOperand()

			var record = JSON.parse(state.record)
			record.push({
				operandA: state.operandA,
				operandB: state.operandB,
				result: state.result,
				expected: state.expected,
				correct: state.result === state.expected
			})
			
			return assign({}, state, {
				mode: 'GAME',
				operandA: a,
				operandB: b,
				result: null,
				expected: a + b,
				horizantal: !state.horizantal,
				record: JSON.stringify(record),
				progress: state.progress + 1
			})

		default: 
			return state
	}

})

function getOperand () {
	var retVal = ''
	const length = sample([2,3,4,5])

	while (retVal.length !== length) {
		retVal += random(0,9).toString()
	}
	return parseInt(retVal)
}


export default store