<script lang="ts">
	import { updateStories, sections } from '$stores/storyStore'
	import type { Writable } from 'svelte/store'
	import { onMount } from 'svelte'
	import { Select, ScrollArea, Tabs, Carousel } from '$ui'
	import Story from '$lib/components/Story.svelte'
	// import { generateStories } from './api/stories/+server';

	export let data

	// $: console.log('data', data, data.sectionQuery)
	let sectionObj = {
		value: data.sectionQuery,
		label: data.sectionQuery
	}

	import { localStorageStore } from '$stores/localStorageStore'

	let lastFetched: any, storiesStore: Writable<StoriesDict>, discardStore: Writable<StoriesDict>

	onMount(() => {
		lastFetched = localStorageStore('lastFetched', new Date().toISOString())
		discardStore = localStorageStore('discardStore', {})
		storiesStore = localStorageStore('storiesStore', {})

		if (data.sectionQuery) {
			// if query is valid, fetch new stories
			updateStories(storiesStore, discardStore, lastFetched, data)
		}
	})
</script>

<div class="container mx-auto flex max-w-5xl flex-col p-3 pb-9">
	<Tabs.Root value="stories" class="w-full">
		<Tabs.List class="w-full">
			<Tabs.Trigger value="stories" class="w-full">Stories</Tabs.Trigger>
			<Tabs.Trigger value="selected" class="w-full">Selected</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="stories">
			<br />
			<section class="flex flex-col gap-5">
				{#if $storiesStore}
					{#each Object.keys($storiesStore) as key}
						<!-- <Carousel.Root class="w-full"> -->
						<h1 class="px-3 text-2xl">
							{key.toUpperCase()}
						</h1>
						<!-- <Carousel.Content> -->
						{#each $storiesStore[key] as story}
							<!-- <Carousel.Item> -->
							<div class="p-1">
								<Story {story} />
							</div>
							<!-- </Carousel.Item> -->
						{/each}
						<!-- </Carousel.Content> -->
						<!-- <Carousel.Previous /> -->
						<!-- <Carousel.Next /> -->
						<!-- </Carousel.Root> -->
					{/each}
				{/if}
			</section>
		</Tabs.Content>
		<Tabs.Content value="selected">
			<br />
			Change your password here.
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
