import m from 'mithril'
import {clone} from 'underscore'
import dragAndDrop from '../dragAndDrop'
import store from '../store'
import {bindActionCreators} from 'redux'
import {
	creators,
	SET_RESULT,
	NEXT_ROUND,
	END_GAME
} from '../actions'

const ints = m.prop([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

const Game = {
	controller: function () {},
	view: function (ctrl, state) {
		let actions = bindActionCreators(creators, store.dispatch)

		if (state.progress > 5) actions[END_GAME]()

		return <div style='margin-top: 20px'>
			<div>
				<div class='operand-container'>{state.operandA}</div>
				{state.horizantal ? <div class='operand-container'>&nbsp;+&nbsp;</div> : <br/>}
				<div class='operand-container'>
					{!state.horizantal ? <span>&nbsp;+&nbsp;</span> : null}
					{state.operandB}
				</div>
			</div>
			<hr/>
			<div 
				class='sort-container'
				config={dragAndDrop}
				ondragend={(order) => {
					let result = parseInt(
						order.map(opt => {
							return opt.split('_')[1]
						}).join('')
					)
					actions[SET_RESULT](result)
				}}
			>
				<div id='result-container' class='connected-sortable'>
				{state.result ? state.result.toString().split('').map(num => {
					<div class='result-number'>
						{num}
					</div>
				}) : null}
				</div>
				<hr/>
				<div id='options-container' class='connected-sortable'>
					{clone(ints()).map(num => {
						return <div class='num-option' data-key={'option_' + num.toString()}>
							{num}
						</div>
					})}
				</div>
			</div>
			<hr />
			<div class='col-xs-12' style='text-align: center'>
				<button 
					class='btn btn-primary'
					onclick={actions[NEXT_ROUND]}
				>
					Submit
				</button>
			</div>
		</div>
	}
}

export default Game