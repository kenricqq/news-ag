<script>
	import { onMount } from 'svelte';
	import { quotes } from '$stores/articleStore';
	import SavedQuote from '$lib/components/SavedQuote.svelte';
	import QuoteForm from '$lib/components/QuoteForm.svelte';

	onMount(() => {
		// get saved quotes
		const savedQuotes = localStorage.getItem('quotes');
		if (savedQuotes) {
			quotes.set(JSON.parse(savedQuotes));
		}
	});
</script>

<div class="container mx-auto flex h-[0vh] max-w-4xl flex-col p-3 pb-9">
	<!-- add quote to list -->
	<div class="flex-shrink-0">
		<QuoteForm />
	</div>

	<h2 class="p-3 text-xl underline decoration-4">Bookmarked Quotes</h2>

	<section class="flex-grow px-3">
		{#each $quotes as quoteObj}
			<!-- pass quote object to SavedQuote -->
			<SavedQuote {quoteObj} />
		{/each}
	</section>
</div>
