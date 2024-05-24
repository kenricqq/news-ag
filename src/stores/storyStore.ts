import { get, writable, type Writable } from 'svelte/store'
// import { localStorageStore } from './localStorageStore'

export const discardStore: Writable<StoriesDict> = writable({})
export const storiesStore: Writable<StoriesDict> = writable({})

export const sections = [
	'arts',
	'automobiles',
	'books/review',
	'business',
	'fashion',
	'food',
	'health',
	'home',
	'insider',
	'magazine',
	'movies',
	'nyregion',
	'obituaries',
	'opinion',
	'politics',
	'realestate',
	'science',
	'sports',
	'sundayreview',
	'technology',
	'theater',
	't-magazine',
	'travel',
	'upshot',
	'us',
	'world'
]

export const initStories = (data: any) => {
	// get saved stories
	const discard = localStorage.getItem('discard')
	if (discard) {
		discardStore.set(JSON.parse(discard))
	}

	const stories = localStorage.getItem('stories')
	if (stories) {
		storiesStore.set(JSON.parse(stories))
	}

	let lastFetched = localStorage.getItem('lastFetched')
	if (!lastFetched) {
		lastFetched = new Date().toISOString()
		localStorage.setItem('lastFetched', lastFetched)
	}

	updateStories(lastFetched, data)
}

export const updateStories = (lastFetched: string, data: any) => {
	// lastUpdate, section, stories
	const { storiesArr } = data

	const prevD = new Date(lastFetched)
	const currD = new Date()

	// if new day, reset all stories store
	const reset = prevD.toDateString() !== currD.toDateString()

	// update lastFetched to now
	localStorage.setItem('lastFetched', new Date().toISOString())

	if (reset) {
		storiesStore.set({})
		discardStore.set({})
	}
	const stories = get(storiesStore)
	const discard = get(discardStore)

	for (let story of storiesArr) {
		if (reset || (!containsStory(stories, story) && !containsStory(discard, story))) {
			if (!stories[story.section]) stories[story.section] = []
			stories[story.section].push(story)
		}
	}
	storiesStore.set(stories)
}

const containsStory = (stories: StoriesDict, story: Story) => {
	// compare obj url
	if (stories[story.section] && stories[story.section].some((s) => s.url == story.url)) {
		return true
	}
	return false
}

export const toggleSelect = (story: Story) => {
	const stories = get(storiesStore)
	stories[story.section].forEach((s) => {
		if (s.url == story.url) {
			s.selected = !s.selected
			console.log(s.selected)
		}
	})
}

// export const toggleDiscardStory = (
// 	storiesStore: Writable<StoriesDict>,
// 	discardStore: Writable<StoriesDict>,
// 	story: Story
// ) => {}
