<script>
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import File from '$lib/icons/file-document.svelte';
	import { onDestroy } from 'svelte';
	import AccountEdit from '$lib/icons/account-edit.svelte';
	import AccountCheck from '$lib/icons/account-check.svelte';
	import Account from '$lib/icons/account.svelte';

	export let template;

	onDestroy(() => {
		URL.revokeObjectURL(template.example);
	});
</script>

<Modal>
	<button class="view" slot="trigger" let:open on:click={open}>
		<Icon src={File} />
		<span>{template.name}</span>
	</button>

	<!--Header-->
	<span slot="header"> Ver documento </span>

	<!--View-->
	<iframe slot="view" src={URL.createObjectURL(template.example) + '#toolbar=0'} title="PDF" />

	<!--Content-->
	<div class="container" slot="content">
		<div class="content">
			<div class="field">
				<div class="title">
					<Icon src={File} size={'32'} />
					<div>{template.name}</div>
				</div>
			</div>
			<div class="field">
				<div class="tag">Descripción</div>
				<div>{template.description}</div>
			</div>
		</div>
		<div class="meta">
			<div class="data">
				<div class="icon"><Icon src={Account} size={'30'} /></div>
				<div>{template.createdBy?.name}</div>
			</div>
			{#if template.updatedBy}
				<div class="data">
					<div class="icon"><Icon src={AccountEdit} size={'30'} /></div>
					<div>{template.updatedBy?.name}</div>
				</div>
			{/if}
		</div>
	</div>
</Modal>

<style>
	iframe {
		width: 60rem;
		height: 50rem;
	}

	div.container {
		width: 22rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0.5rem;
		justify-content: space-between;
	}

	div.content {
		overflow-wrap: anywhere;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	div.field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	div.tag {
		color: var(--focus-color);
	}

	div.title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.2rem;
	}

	div.meta {
		overflow-wrap: anywhere;
		width: 22rem;
		display: flex;
		flex-flow: column;
		gap: 0.5rem;
		border-top: 2px solid var(--border-color);
		padding-top: 1.5rem;
	}

	div.data {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.1rem;
	}

	div.icon {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button.view {
		padding: 1rem;
		cursor: pointer;
		display: flex;
		width: 100%;
		align-items: center;
		gap: 6px;
		background-color: var(--input-color);
	}
	button.view:hover {
		background-color: var(--area-color);
	}
</style>
