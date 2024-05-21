<script lang="ts">
	import { deleteQuote } from '$stores/articleStore'

	interface Quote {
		quoteText: string
		id: number
	}

	export let quoteObj: Quote
</script>

<blockquote
	class="m-2 flex flex-col justify-between gap-3 rounded-md bg-slate-800 bg-opacity-70 p-5 text-lg sm:flex-row"
>
	<!-- quote text -->
	{quoteObj.quoteText}

	<!-- delete button -->
	<button on:click={() => deleteQuote(quoteObj.quoteText)}>delete</button>
</blockquote>
