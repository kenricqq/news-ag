<script lang="ts">
	import { Plus } from 'lucide-svelte'
	import { formatDistanceStrict } from 'date-fns'
	import { Button } from '$ui'

	import { toggleSelect } from '$stores/storyStore'

	export let story: Story
	export let selected = false

	const { title, description, url, multimedia, updated_date } = story
</script>

<div class="m-2 flex flex-col justify-between gap-7 rounded-md border bg-white p-5 font-serif">
	<section class="flex h-full flex-col justify-between gap-5 p-3">
		<aside class="flex flex-col justify-between gap-3">
			<a href={url} target="_blank" class="text-xl hover:underline">
				{title}
			</a>
			<p class="text-base">
				{description}
			</p>
		</aside>

		<!-- {#if !selected} -->
		<!-- {#key story.selected} -->
		<aside class="flex flex-col gap-3">
			<Button on:click={() => toggleSelect(story)}>
				{#if story.selected}
					Remove
				{:else}
					Add
				{/if}
			</Button>

			{formatDistanceStrict(new Date(updated_date), new Date())} ago
		</aside>
		<!-- {/key} -->
		<!-- {/if} -->

		<!-- <Plus /> -->
	</section>

	<!-- <section>
		{#if multimedia}
			<img src={multimedia[1].url} alt="" class="max-w-full rounded-md" />
		{:else}
			{console.log(story)}
			<img src="" alt="" />
		{/if}
	</section> -->
</div>

<style>
</style>
