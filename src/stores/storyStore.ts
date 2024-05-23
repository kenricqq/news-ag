import { get, type Writable } from 'svelte/store'
// import { localStorageStore } from './localStorageStore'

// const discardStore = localStorageStore('discardStore', {})
// const storiesStore = localStorageStore('storiesStore', {})

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

export const updateStories = (
	storiesStore: Writable<StoriesDict>,
	discardStore: Writable<StoriesDict>,
	lastFetched: Writable<string>,
	data: any
) => {
	// lastUpdate, section, stories
	const { storiesArr } = data

	const prevD = new Date(get(lastFetched))
	const currD = new Date()

	// if new day, reset all stories store
	const reset = prevD.toDateString() !== currD.toDateString()
	lastFetched.set(currD.toISOString())
	// const reset = true

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

export const toggleSelect = (storiesStore: Writable<StoriesDict>, story: Story) => {}

// export const toggleDiscardStory = (
// 	storiesStore: Writable<StoriesDict>,
// 	discardStore: Writable<StoriesDict>,
// 	story: Story
// ) => {}
