<script>
	import Modal from '$lib/components/Modal.svelte';
	import Pencil from '$lib/icons/pencil.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import CategoryContent from '$lib/modals/category/CategoryContent.svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { requester } from '$lib/fetcher';

	const dispatch = createEventDispatcher();
	const [request, loading, err] = requester();
	let isOpen = false;

	export let category;
	let editableCategory = { ...category };

	// Disable submit button if there's no changes
	$: disableSubmit = Object.keys(category).every(
		(key) => editableCategory.hasOwnProperty(key) && editableCategory[key] === category[key]
	);

	function handleSubmit() {
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(editableCategory).forEach((key) => formData.append(key, editableCategory[key]));

		request(
			{
				url: `http://localhost:4000/documents/${$page.params.category}`,
				method: 'put',
				data: formData
			},
			{
				finalize: (fetchedData) => {
					editableCategory = { ...fetchedData.data };
					$err = null;
					isOpen = false;
					dispatch('request', fetchedData.data);
				}
			}
		);
	}

	function handleCancel() {
		editableCategory = { ...category };
		$err = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<button class="edit" slot="trigger" let:open on:click={open}>
		<Icon src={Pencil} />
	</button>

	<!--Header-->
	<span slot="header"> Editar categoria </span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<CategoryContent bind:category={editableCategory} />
		{#if $err}
			<ErrorToast bind:error={$err} />
		{/if}
		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button disabled={disableSubmit} class="submit" type="submit">
				{#if $loading}
					<Loading />
				{:else}
					Editar
				{/if}
			</button>
		</div>
	</form>
</Modal>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	div {
		display: flex;
		gap: 1rem;
	}

	button {
		padding: 1rem;
	}
	button.edit {
		cursor: pointer;
		display: flex;
		align-items: center;
		background-color: var(--input-color);
	}
	button.edit:hover {
		background-color: var(--area-color);
	}

	button.submit {
		width: 100%;
		background-color: var(--blue-color);
		border: 2px solid var(--blue-color);
		cursor: pointer;
	}
	button.submit:hover {
		background: var(--blue-color);
	}

	button.submit:active {
		background-color: var(--blue-color);
	}

	button.cancel {
		width: 100%;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		cursor: pointer;
	}
	button.cancel:hover {
		background: var(--area-color);
	}

	button.cancel:active {
		background-color: var(--input-color);
	}
</style>
