<script lang="ts">
	export let showModal: boolean // boolean

	let dialog: HTMLDialogElement // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="bg-inherit"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click|stopPropagation
		class="grid grid-cols-2 gap-2 rounded-md bg-slate-800 p-2 sm:grid-cols-4 md:grid-cols-5"
	>
		<slot />
	</div>

	<section class="mx-3 flex items-center justify-end">
		<slot name="reset" />

		<div class="mx-1 my-2 rounded-lg bg-slate-100 p-3">
			<!-- svelte-ignore a11y-autofocus -->
			<button autofocus on:click={() => dialog.close()}>Close</button>
		</div>
	</section>
</dialog>
