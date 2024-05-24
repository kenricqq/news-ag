<script lang="ts">
	import { discardStore, storiesStore, initStories, sections } from '$stores/storyStore'
	import type { Writable } from 'svelte/store'
	import { onMount } from 'svelte'
	import { Select, ScrollArea, Button, Tabs, Carousel } from '$ui'
	import Story from '$lib/components/Story.svelte'
	// import { generateStories } from './api/stories/+server';

	export let data

	// $: console.log('data', data, data.sectionQuery)
	let sectionObj = {
		value: data.sectionQuery,
		label: data.sectionQuery
	}

	let selectedStories: StoriesDict = {}

	// let lastFetched: any, storiesStore: Writable<StoriesDict>, discardStore: Writable<StoriesDict>

	// onMount(() => {
	// 	lastFetched = localStorageStore('lastFetched', new Date().toISOString())
	// 	discardStore = localStorageStore('discard', {})
	// 	storiesStore = localStorageStore('stories', {})

	// 	if (data.sectionQuery) {
	// 		// if query is valid, fetch new stories
	// 		updateStories(storiesStore, discardStore, lastFetched, data)
	// 	}
	// })

	storiesStore.subscribe((storiesDict) => {
		// selectedStories = storiesDict
		for (const section of Object.keys($storiesStore)) {
			for (const story of $storiesStore[section]) {
				if (story.selected) {
					if (selectedStories[section]) {
						selectedStories[section].push(story)
					} else {
						selectedStories[section] = [story]
					}
				}
			}
		}
	})

	onMount(() => {
		if (data.sectionQuery) {
			// if query is valid, fetch new stories
			initStories(data)
		}
	})
</script>

<div class="container mx-auto flex max-w-6xl flex-col p-3 pb-9">
	<Tabs.Root value="stories" class="w-full">
		<Tabs.List class="w-full">
			<Tabs.Trigger value="stories" class="w-full">Stories</Tabs.Trigger>
			<Tabs.Trigger value="selected" class="w-full">Selected</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="stories">
			{#if $storiesStore}
				{#each Object.keys($storiesStore) as key}
					<!-- <Carousel.Root class="w-full"> -->
					<h1 class="sectionTitle">
						{key.toUpperCase()}
					</h1>
					<!-- <Carousel.Content> -->
					<div class="content">
						{#each $storiesStore[key] as story}
							<!-- <Carousel.Item> -->
							<Story {story} />
							<!-- </Carousel.Item> -->
						{/each}
					</div>
					<!-- </Carousel.Content> -->
					<!-- <Carousel.Previous /> -->
					<!-- <Carousel.Next /> -->
					<!-- </Carousel.Root> -->
				{/each}
			{/if}
		</Tabs.Content>
		<Tabs.Content value="selected">
			<!-- Trigger -->
			<button
				class="btn"
				data-clipboard-text="Just because you can doesn't mean you should — clipboard.js"
			>
				Copy to clipboard
			</button>
			<Button class="w-full" variant="outline">Copy</Button>
			{#if $storiesStore}
				{#each Object.keys($storiesStore) as key}
					{#if $storiesStore[key].some((story) => story.selected)}
						<h1 class="sectionTitle">
							{key.toUpperCase()}
						</h1>
					{/if}
					<div class="content">
						{#each $storiesStore[key] as story}
							{#if story.selected}
								<Story {story} />
							{/if}
						{/each}
					</div>
				{/each}
			{/if}
		</Tabs.Content>
	</Tabs.Root>
</div>

<!-- new query based on section selection -->
<!-- <Select.Root portal={null} bind:selected={sectionObj}>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Select a section" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<ScrollArea class="h-[200px] p-3">
				{#each sections as section}
					<Select.Item value={section} label={section}>{section}</Select.Item>
				{/each}
			</ScrollArea>
		</Select.Group>
	</Select.Content>
</Select.Root>
<button on:click={() => console.log(`get ${sectionObj.value} data`)}>Get Data</button> -->

<style>
	.sectionTitle {
		@apply mt-3 px-3 text-2xl;
	}

	.content {
		@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3;
	}
</style>
