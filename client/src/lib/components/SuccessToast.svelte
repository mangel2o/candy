<script>
	import Icon from '$lib/components/Icon.svelte';
	import Close from '$lib/icons/close.svelte';
	import { slide } from 'svelte/transition';
	export let successMessage;
	let prevSuccessMessage = successMessage;
</script>

<div in:slide={{ duration: 200 }} out:slide|local={{ duration: 200 }} class="container">
	<div class="success">
		<span class="tag">SUCCESS: </span>
		<span>
			{#if successMessage}
				{successMessage}
			{:else}
				{prevSuccessMessage}
			{/if}
		</span>
	</div>
	<button type="button" on:click={() => (successMessage = null)}>
		<Icon src={Close} />
	</button>
</div>

<style>
	div.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		gap: 1rem;
		border: 2px solid var(--green-color);
	}

	div.success {
		display: flex;
		width: 100%;
		gap: 0.5rem;
		padding: 1rem;
	}

	span.tag {
		color: var(--green-color);
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--area-color);
		padding: 1rem;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--input-color);
	}
</style>
