import m from 'mithril'
import {defer} from 'underscore'

export default function dragAndDrop(el, isInit, ctx) {

	console.log(ctx)

	$('#result-container, #options-container').sortable({
		connectWith: '.connected-sortable',
		helper: 'clone',
		start: (e) => {
			m.startComputation()
		},
		stop: (e, ui) => {
			var order = []

			$('#result-container').children().each((idx, child) => {
				order.push($(child).attr('data-key'))
			})

			var event = new Event('dragend')

			el.ondragend.call(el, order)

			defer(function () {
				m.endComputation()
			})
		},
		remove: function (event, ui) {
			if ($(this).attr('id') !== 'result-container') {
				ui.item.clone().appendTo('#result-container');
				$(this).sortable('cancel');
			} else {
				ui.item.remove()
			}
		}
	})

}