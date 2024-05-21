<script lang="ts">
	import { updateStories, sections } from '$stores/storyStore'
	import { onMount } from 'svelte'
	import { Select, ScrollArea } from '$ui'
	// import { generateStories } from './api/stories/+server';

	export let data

	$: console.log('data', data, data.sectionQuery)
	let sectionObj = {
		value: data.sectionQuery,
		label: data.sectionQuery
	}

	import { localStorageStore } from '$stores/localStorageStore'

	let lastFetched: any, selectedStories: any, discardedStories: any, newStories: any

	onMount(() => {
		lastFetched = localStorageStore('lastFetched', new Date().toISOString())
		selectedStories = localStorageStore('selectedStories', {})
		discardedStories = localStorageStore('discardedStories', {})
		newStories = localStorageStore('newStories', {})

		if (data.sectionQuery) {
			// if query is valid, fetch new stories
			updateStories(selectedStories, discardedStories, newStories, lastFetched, data)
		}
	})
</script>

{data.sectionQuery}

<Select.Root portal={null} bind:selected={sectionObj}>
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

<button on:click={() => console.log(`get ${sectionObj.value} data`)}>Get Data</button>

<!-- 
{#if !data.stories}
	<p>loading...</p>
{:else}
	{#each data.stories as story}
		<div class="m-3 bg-blue-500 p-5">
			<a href={story.url}>{story.title}</a>
		</div>
	{/each}
{/if} -->

<!-- <button on:click={handleClick}>gen stories</button> -->
<!-- {#each data.stories as story}
	<h1>
		{story.title}
	</h1>
{/each} -->

<!-- 
{#await getStories()}
	loading...
{:then stories}
	{#each stories as story}
		<div class="bg-blue-500 p-5 m-3">
			<a href={story.url}>{story.title}</a>
			<p>{story.abstract}</p>
			<p>{story.section}</p>
		</div>
	{/each}
	<p>showing {stories.length} stories</p>
{:catch error}
	<p>error: {error.message}</p>
{/await} -->
