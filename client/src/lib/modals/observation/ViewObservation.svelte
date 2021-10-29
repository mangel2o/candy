<script>
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import CommentText from '$lib/icons/comment-text.svelte';
	import AccountEdit from '$lib/icons/account-edit.svelte';
	import AccountCheck from '$lib/icons/account-check.svelte';
	import Account from '$lib/icons/account.svelte';

	export let observation;
</script>

<Modal>
	<button class="view" slot="trigger" let:open on:click={open}>
		<Icon src={CommentText} />
		<span>{observation.name}</span>
	</button>

	<!--Header-->
	<span slot="header"> Ver observación </span>

	<!--Content-->
	<div class="container" slot="content">
		<div class="content">
			<div class="field">
				<div class="title">
					<Icon src={CommentText} size={'32'} />
					<div>{observation.name}</div>
				</div>
			</div>
			<div class="field">
				<div class="tag">Comentario</div>
				<div class="comment">{observation.comment}</div>
			</div>
		</div>
		<div class="meta">
			<div class="data">
				<div class="icon"><Icon src={Account} size={'30'} /></div>
				<div>{observation.createdBy?.name}</div>
			</div>
			{#if observation.updatedBy}
				<div class="data">
					<div class="icon"><Icon src={AccountEdit} size={'30'} /></div>
					<div>{observation.updatedBy?.name}</div>
				</div>
			{/if}
		</div>
	</div>
</Modal>

<style>
	div.container {
		width: 38rem;
		height: 18rem;
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		gap: 1rem;
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
		gap: 0.5rem;
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
		width: 100%;
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

	button {
		padding: 1rem;
	}
	button.view {
		cursor: pointer;
		display: flex;
		width: 100%;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--input-color);
	}
	button.view:hover {
		background-color: var(--area-color);
	}
</style>
