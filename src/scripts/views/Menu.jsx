import m from 'mithril'
import {bindActionCreators} from 'redux'
import store from '../store'
import {
	creators,
	START_GAME
} from '../actions'

const Menu = {
	controller: function () {},
	view: function (ctrl, state) {
		let actions = bindActionCreators(creators, store.dispatch)

		return <div style='text-align: center;margin-top:50px;'>
			<button 
				class='btn btn-success'
				onclick={actions[START_GAME]}
			>
				START GAME
			</button>
		</div>
	}
}

export default Menu