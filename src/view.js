import { store, getElement } from "@wordpress/interactivity";
import { actions } from "@wordpress/interactivity-router";

store("workshop", {
	actions: {
		*navigate(event) {
			event.preventDefault();
			const { ref } = getElement();
			yield actions.navigate(ref.href);
		},
	},
});
