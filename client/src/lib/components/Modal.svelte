<script>
	import Close from '$lib/icons/close.svelte';
	import Icon from '$lib/components/Icon.svelte';

	export let isOpen = false;

	function open() {
		isOpen = true;
	}

	function close() {
		isOpen = false;
	}
</script>

<slot name="trigger" {open} />

{#if isOpen}
	<div class="modal">
		<div class="backdrop" on:click={close} />

		<div class="wrapper">
			<div class="header">
				<slot name="header" />
				<button class="close" on:click={close}>
					<Icon src={Close} />
				</button>
			</div>

			<div class="container">
				<slot name="view" />
				<slot name="content" />
			</div>
		</div>
	</div>
{/if}

<style>
	button.close {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 1rem;
		background-color: var(--input-color);
	}

	button.close:hover {
		background-color: var(--area-color);
	}

	div.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	div.backdrop {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: var(--modal-background);
	}

	div.wrapper {
		z-index: 10;
		width: fit-content;
		border-radius: 0.3rem;
		background-color: var(--input-color);
		overflow: hidden;
		border: 2px solid var(--border-color);
	}

	div.header {
		height: 56px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 0 0 20px;
		font-size: 18px;
	}

	div.container {
		background-color: var(--area-color);
		display: flex;
		gap: 1rem;
		padding: 1rem;
		width: 100%;
	}
</style>
