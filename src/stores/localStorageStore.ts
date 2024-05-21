import { writable } from 'svelte/store'

export function localStorageStore(key: string, initial: any) {
	if (!localStorage.getItem(key)) {
		localStorage.setItem(key, JSON.stringify(initial))
	}

	let saved = JSON.parse(localStorage.getItem(key) || 'null') // shouldn't be null, item set above

	let { subscribe, set, update } = writable(saved)

	return {
		subscribe,
		set: (value: any) => {
			localStorage.setItem(key, JSON.stringify(value))
			return set(value)
		},
		update
	}
}

// import { localStorageStore } from './localStorageStore.js'

// let message = localStorageStore('message', 'Hello 👋')

// $message = 'Bye 👋'
