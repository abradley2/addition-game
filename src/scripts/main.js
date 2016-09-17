import m from 'mithril'
import store from './store'

import Menu from './views/Menu'
import Game from './views/Game'
import End from './views/End'

store.dispatch({
	type: "Let's get this party started!"
})

const App = {
	controller: function () {

	},
	view: function (ctrl) {
		let state = store.getState()

		return <div class='container'>
			{	
				(state.mode === 'MENU') ? <Menu {...state} /> 	:
				(state.mode === 'GAME') ? <Game {...state} /> 	:
				(state.mode === 'END') 	? <End {...state} /> 	: null
			}
		</div>
	}
}

document.addEventListener('DOMContentLoaded', function () {

	m.mount(
		document.getElementById('game'),
		App
	)

})
