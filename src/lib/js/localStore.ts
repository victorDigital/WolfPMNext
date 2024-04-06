import { writable } from 'svelte/store';

export const localStore = <T>(key: string) => {
	// if ion server, return
	if (typeof window === 'undefined') {
		return writable<T | null>(null);
	}

	// receives the key of the local storage and an initial value

	// helper functions
	const toString = (value: any) => JSON.stringify(value, null, 2);
	const toObj = (value: any) => (value ? JSON.parse(value) : null);

	// convert to object
	const saved = toObj(localStorage.getItem(key));

	// create the underlying writable store
	const { subscribe, set, update } = writable<T>(saved);
	return {
		subscribe,
		set: (value: T) => {
			// save also to local storage as a string
			if (value || value === 0 || value === false) {
				localStorage.setItem(key, toString(value));
				console.log('localStore set', key, value);
			}

			return set(toObj(localStorage.getItem(key)));
		},
		update
	};
};
