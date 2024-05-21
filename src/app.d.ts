// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Story {
		// id: number;
		section: string
		title: string
		abstract: string
		url: string
		[key: string]: any
	}

	interface Stories {
		[sectionQuery: string]: Story[]
	}
}

export {}
