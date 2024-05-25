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

	onMount(() => {
		// if query is valid, fetch new stories
		initStories(data, data.sectionQuery)
	})

	let message = 'Copy'
	function copyToClip() {
		const str = document.getElementById('foo')?.innerHTML
		message = "Copied!"
		setTimeout(() => {
			message = "Copy"
		}, 700)

		function listener(e: any) {
			e.clipboardData.setData('text/html', str)
			e.clipboardData.setData('text/plain', str)
			e.preventDefault()
		}
		document.addEventListener('copy', listener)
		document.execCommand('copy')
		document.removeEventListener('copy', listener)
	}
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
					<h3 class="sectionTitle">
						{key.toUpperCase()}
					</h3>
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

			<Button class="w-full" variant="outline" on:click={copyToClip}>{message}</Button>
			<div id="foo">
				{#if $storiesStore}
					{#each Object.keys($storiesStore) as key}
						{#if $storiesStore[key].some((story) => story.selected)}
							<h3 class="sectionTitle">
								{key.toUpperCase()}
							</h3>
						{/if}
						<div class="content">
							{#each $storiesStore[key] as story}
								{#if story.selected}
									<Story {story} selected={true} />
								{/if}
							{/each}
						</div>
					{/each}
				{/if}
			</div>
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
