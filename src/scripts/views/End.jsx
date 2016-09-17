import m from 'mithril'
import {bindActionCreators} from 'redux'
import store from '../store'
import {
	creators,
	START_GAME
} from '../actions'

const End = {
	controller: function () {},
	view: function (ctrl, state) {
		let record = JSON.parse(state.record)

		let score = record.filter(result => {
			return result.result === result.expected
		}).length

		let actions = bindActionCreators(creators, store.dispatch)

		return <div>
		{record.map(result => {
			return <div
				class={`alert alert-${(result.result === result.expected) ? 'info' : 'warning'}`}
			>
				{`${result.operandA} + ${result.operandB} = ${result.result} (${result.expected})`}
			</div>
		})}
		<hr />
		<button
			onclick={actions[START_GAME]}
			class='btn btn-primary'
		>
			Play Again?
		</button>
		</div>
	}
}

export default End