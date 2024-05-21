import type { Actions } from './$types'

// loads newest stories from NYT API
export async function load({ fetch }) {
	const response = await fetch('/api/stories')
	const data = await response.json()

	// if data empty,{}, throw error, or skip?
	return data
}

export const actions = {
	default: async ({ cookies, fetch, request }) => {
		const formData = await request.formData();
		const section = formData.get('section') as string
		cookies.set('section', section, { path: '/' })

		await fetch('/api/stories')
	}
} satisfies Actions

// logic design

// 1. fetch data from NYT API
// 2. store in local storage: stories and time last updated; reset stories if new day
// 3. for every new query, add new items to newStories and todayStories, to be reviewed by user

// stores:
// todayStories: list of stories returned by API within a day
// selectedStories: all stories except the ones user removed
// newStories: stories added recently, within 1-2 hours, and haven't been interacted with by user
