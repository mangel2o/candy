<script>
	import Icon from '$lib/components/Icon.svelte';
	import Close from '$lib/icons/close.svelte';
	import { slide } from 'svelte/transition';
	export let error;
	let prevError = error;
</script>

<div in:slide={{ duration: 200 }} out:slide|local={{ duration: 200 }} class="container">
	<div class="error">
		<span class="tag">ERROR: </span>
		<span>
			{#if error}
				{error}
			{:else}
				{prevError}
			{/if}
		</span>
	</div>
	<button type="button" on:click={() => (error = null)}>
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
		border: 2px solid var(--red-color);
	}

	div.error {
		display: flex;
		width: 100%;
		gap: 0.5rem;
		padding: 1rem;
	}

	span.tag {
		color: var(--orange-color);
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
