<!-- <script>
	import { onMount } from 'svelte'
	import { quotes } from '$stores/articleStore'

	onMount(() => {
		// get saved quotes
		const savedQuotes = localStorage.getItem('quotes')
		if (savedQuotes) {
			quotes.set(JSON.parse(savedQuotes))
		}
	})

	export let data
	console.log('data', data)
</script>

<div class="size-96 bg-blue-50">
	<!-- <button on:click={() => generateStories()}>generate stories</button> -->
</div>

<div class="container mx-auto flex h-[0vh] max-w-4xl flex-col p-3 pb-9">
	<h2 class="p-3 text-xl underline decoration-4">Bookmarked Quotes</h2>

	<section class="flex-grow px-3">
	</section>
</div> -->
