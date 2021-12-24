<script>
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Archive from '$lib/icons/archive.svelte';
	import File from '$lib/icons/file-document.svelte';
	import Account from '$lib/icons/account.svelte';
	import FileDocumentMultiple from '$lib/icons/file-document-multiple.svelte';
	import Eye from '$lib/icons/eye.svelte';
	import OpenInNew from '$lib/icons/open-in-new.svelte';
	import formatDistance from 'date-fns/formatDistance';

	export let action = null;
	let isOpen = false;
	let data = JSON.parse(action.data);
	const icon = {
		archive: Archive,
		observation: Eye,
		document: File,
		template: File,
		category: FileDocumentMultiple,
		user: Account,
		student: Account
	};
	const link = {
		responsible: `/admin/${action.createdBy}`,
		archive: `/students/${action.affectedStudent}/archives`,
		observation: `/students/${action.affectedStudent}/observations`,
		document: `/students/${action.affectedStudent}/documents`,
		template: `/documents/${data.category}/`,
		category: `/documents`,
		user: `/admin/${action.affectedUser}`,
		student: `/students/${action.affectedStudent}/`
	};
</script>

<Modal bind:isOpen>
	<!--Button-->
	<button class="open" slot="trigger" let:open on:click={open}>
		<div class="button-content">
			<Icon src={icon[action.name]} />
			<span class={`type ${action.type}`} />
			<span>{action.description}</span>
		</div>
		<span>
			{formatDistance(new Date(action.createdAt), new Date(), { addSuffix: true })}
		</span>
	</button>

	<!--Header-->
	<span slot="header">{action.description}</span>

	<!--Content-->
	<div class="content" slot="content">
		<div class="field">
			<div class="tag">Nombre</div>
			<div>{data.name}</div>
		</div>
		{#if data.description}
			<div class="field">
				<div class="tag">Descripción</div>
				<div>{data.description}</div>
			</div>
		{:else if data.comment}
			<div class="field">
				<div class="tag">Comentario</div>
				<div>{data.comment}</div>
			</div>
		{:else}
			<div class="field">
				<div class="tag">Descripción</div>
				<div>{action.description}</div>
			</div>
		{/if}
		<div class="links">
			<a href={link.responsible}>
				<Icon src={OpenInNew} />
				<span>Responsable</span>
			</a>
			{#if action.type !== 'delete'}
				<a href={link[action.name]}>
					<Icon src={OpenInNew} />
					<span>Afectado</span>
				</a>
			{/if}
		</div>
	</div>
</Modal>

<style>
	div.field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	div.tag {
		color: var(--focus-color);
	}

	div.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 500px;
		overflow-wrap: break-word;
	}

	div.button-content {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	div.links {
		display: flex;
		gap: 1rem;
		width: 100%;
	}

	a {
		cursor: pointer;
		padding: 1rem;
		gap: 6px;
		align-items: center;
		display: flex;
		justify-content: center;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		width: 100%;
	}
	a:hover {
		border: 2px solid var(--blue-color);
	}
	a:focus {
		border: 2px solid var(--green-color);
	}
	a:active {
		border: 2px solid var(--blue-color);
	}

	button.open {
		cursor: pointer;
		padding: 1rem;
		align-items: center;
		display: flex;
		justify-content: space-between;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		width: 100%;
	}
	button.open:hover {
		border: 2px solid var(--blue-color);
	}
	button.open:focus {
		border: 2px solid var(--green-color);
	}
	button.open:active {
		border: 2px solid var(--blue-color);
	}

	span.type {
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 0.5rem;
	}

	span.create {
		background-color: var(--green-color);
	}
	span.update {
		background-color: var(--blue-color);
	}
	span.delete {
		background-color: var(--red-color);
	}
</style>
