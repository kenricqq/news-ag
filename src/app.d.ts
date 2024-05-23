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
		url: string
		description: string
		selected: boolean
		updated_date: string
		multimedia: any
		[key: string]: any
	}

	interface StoriesDict {
		[sectionQuery: string]: Story[]
	}
}

export {}
