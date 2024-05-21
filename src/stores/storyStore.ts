import { get, writable, type Writable } from 'svelte/store'

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
	selectedStore: Writable<Stories>,
	discardedStore: Writable<Stories>,
	newStore: Writable<Stories>,
	lastFetched: Writable<string>,
	data: any
) => {
	// lastUpdate, section, stories
	const { stories } = data
	const finalStories = stories.map((story: any) => {
		return {
			section: story.section,
			title: story.title,
			url: story.url,
			abstract: story.abstract,
			published_date: story.published_date,
			multimedia: story.multimedia
		}
	})

	console.log('stories in updates', finalStories)

	const prevD = new Date(get(lastFetched))
	const currD = new Date()

	// if new day, reset all stories store
	const reset = prevD.toDateString() !== currD.toDateString()
	lastFetched.set(currD.toISOString())
	// const reset = true

	if (reset) {
		newStore.set({})
		selectedStore.set({})
		discardedStore.set({})
	}
	const newStories = get(newStore)
	const selectedStories = get(selectedStore)
	const discardStories = get(selectedStore)

	for (let story of finalStories) {
		if (
			reset ||
			(!containsStory(selectedStories, story) &&
				!containsStory(discardStories, story) &&
				!containsStory(newStories, story))
		) {
			if (!newStories[story.section]) newStories[story.section] = []
			newStories[story.section].push(story)
		}
	}
	newStore.set(newStories)
}

const containsStory = (stories: Stories, story: Story) => {
	// compare obj url
	if (stories[story.section] && stories[story.section].some((s) => s.url == story.url)) {
		return true
	}
	return false
}

export const selectStory = (
	selectedStore: Writable<Stories>,
	newStore: Writable<Stories>,
	story: Story
) => {}

export const discardStory = (
	selectedStore: Writable<Stories>,
	newStore: Writable<Stories>,
	story: Story
) => {}

// selectedStories U discardStories U newStories: makes total stories; in otherwords, they do not overlap
