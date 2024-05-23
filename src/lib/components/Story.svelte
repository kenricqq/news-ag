<script lang="ts">
	import { Plus } from 'lucide-svelte'
	import { formatDistanceStrict } from 'date-fns'
	import { Button } from '$ui'
	import { toggleSelect } from '$stores/storyStore'

	export let story: Story

	const { title, description, url, multimedia, selected, updated_date } = story
</script>

<div class="m-2 flex justify-between gap-7 rounded-md border bg-white p-7 font-serif">
	<section class="flex flex-col justify-between gap-3">
		<aside class="flex flex-col justify-between gap-3">
			<a href={url} target="_blank" class="text-2xl">
				{title}
			</a>
			<p class="text-lg">
				{description}
			</p>
		</aside>

		<Button on:click={toggleSelect}>
			{#if selected}
				Remove
			{:else}
				Add
			{/if}
		</Button>

		{formatDistanceStrict(new Date(updated_date), new Date())} ago

		<!-- <Plus /> -->
	</section>

	<section>
		{#if multimedia}
			<img src={multimedia[1].url} alt="" class="max-w-[30rem]" />
		{:else}
			{console.log(story)}
			<img src="" alt="" />
		{/if}
	</section>
</div>

<style>
</style>
