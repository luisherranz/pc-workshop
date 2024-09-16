import { store, getElement } from "@wordpress/interactivity";

store("workshop", {
	actions: {
		*navigate(event) {
			event.preventDefault();
			const { ref } = getElement();
			const { actions } = yield import("@wordpress/interactivity-router");
			yield actions.navigate(ref.href);
		},
	},
});
