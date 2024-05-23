<script lang="ts">
	// import { deleteQuote } from '$stores/storyStore'
	import { Plus } from 'lucide-svelte'

	export let story: Story
</script>

<div class="m-2 flex justify-between gap-5 rounded-md border bg-white p-5 font-serif">
	<section class="flex flex-col gap-3">
		<a href={story.url} target="_blank" class="text-xl">
			{story.title}
		</a>
		<p>
			{story.description}
		</p>

		<!-- <Plus /> -->
	</section>

	<section>
		{#if story.multimedia}
			<img src={story.multimedia[1].url} alt="" class="max-w-96" />
		{:else}
			{console.log(story)}
			<img src="" alt="" />
		{/if}
	</section>

	<!-- delete button -->
	<!-- <button on:click={() => deleteQuote(quoteObj.quoteText)}>delete</button> -->
</div>

<style>
</style>
