<script>
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import File from '$lib/icons/file-document.svelte';
	import { onDestroy } from 'svelte';

	export let document;
	let currentTab = document.file ? 'document' : 'example';

	onDestroy(() => {
		if (document.file) {
			URL.revokeObjectURL(document.file);
		}
		URL.revokeObjectURL(document.example);
	});
</script>

<Modal>
	<button class="view" slot="trigger" let:open on:click={open}>
		<div class="btn">
			<Icon src={File} />
			<span>{document.name}</span>
		</div>

		<div class="status">
			<div class={'circle ' + document.status.toLowerCase()} />
			{document.status}
		</div>
	</button>

	<!--Header-->
	<div class="header" slot="header">
		<button
			on:click={() => (currentTab = 'document')}
			class="tab"
			class:active={currentTab === 'document'}
			disabled={document.file ? false : true}
		>
			Ver documento
		</button>
		<button
			on:click={() => (currentTab = 'example')}
			class="tab"
			class:active={currentTab === 'example'}
		>
			Ver ejemplo
		</button>
	</div>

	<!--View-->
	<iframe
		slot="view"
		src={(currentTab === 'example'
			? URL.createObjectURL(document.example)
			: URL.createObjectURL(document.file)) + '#toolbar=0'}
		title="PDF"
	/>

	<!--Content-->
	<div class="content" slot="content">
		<div class="field">
			<div class="title">
				<Icon src={File} size={'30'} />
				<div>{document.name}</div>
			</div>
		</div>
		<div class="field">
			<div class="tag">Descripción</div>
			<div>{document.description}</div>
		</div>

		{#if document.comment}
			<div class="field">
				<div class="tag">Comentario</div>
				<div>{document.comment}</div>
			</div>
		{/if}

		<div class="field">
			<div class="tag">Estatus</div>
			<div class={'status-tag ' + document.status.toLowerCase()}>{document.status}</div>
		</div>
	</div>
</Modal>

<style>
	iframe {
		width: 60rem;
		height: 50rem;
	}

	div.content {
		overflow-wrap: anywhere;
		width: 22rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0.5rem;
	}

	div.field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	div.tag {
		color: var(--focus-color);
	}

	div.btn {
		display: flex;
		align-items: center;
		text-align: center;
		gap: 0.5rem;
	}

	div.title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.2rem;
	}

	div.header {
		display: flex;
	}

	div.status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	div.status-tag {
		width: 100%;
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	div.status-tag.vacio {
		border: 2px solid var(--focus-color);
	}
	div.status-tag.completo {
		border: 2px solid var(--green-color);
	}
	div.status-tag.pendiente {
		border: 2px solid var(--yellow-color);
	}
	div.status-tag.incompleto {
		border: 2px solid var(--red-color);
	}
	div.status-tag.retenido {
		border: 2px solid var(--blue-color);
	}

	div.circle {
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 0.5rem;
	}

	div.circle.vacio {
		background-color: var(--focus-color);
	}
	div.circle.completo {
		background-color: var(--green-color);
	}
	div.circle.pendiente {
		background-color: var(--yellow-color);
	}
	div.circle.incompleto {
		background-color: var(--red-color);
	}
	div.circle.retenido {
		background-color: var(--blue-color);
	}

	button {
		background-color: transparent;
		padding: 1rem;
	}
	button.view {
		cursor: pointer;
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		background-color: var(--input-color);
	}
	button.view:hover {
		background-color: var(--area-color);
	}

	button.tab {
		cursor: pointer;
		border-bottom: 2px solid var(--border-color);
	}
	button.tab:hover {
		color: var(--placeholder-color);
	}

	button.tab.active {
		border-bottom: 2px solid var(--orange-color);
	}
	button.tab.active:hover {
		color: var(--white-color);
	}

	button.tab:disabled {
		cursor: default;
		color: var(--focus-color);
	}
</style>
