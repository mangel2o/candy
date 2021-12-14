<script>
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import AccountPlus from '$lib/icons/account-plus.svelte';
	import UserContent from '$lib/modals/admin/UserContent.svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import { userStore } from '$lib/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { requester } from '$lib/fetcher';

	const users = getContext('users');
	const dispatch = createEventDispatcher();
	const [request, loading, err] = requester();
	let isOpen = false;
	let user = {
		name: '',
		number: '',
		campus: '',
		genre: '',
		active: '',
		phone: '',
		personalEmail: '',
		role: ''
	};

	function handleSubmit() {
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(user).forEach((key) => formData.append(key, user[key]));

		request(
			{
				url: `http://localhost:4000/users`,
				method: 'post',
				data: formData
			},
			{
				finalize: (fetchedData) => {
					const newUsers = { ...$users };

					// * Resets the students table at /students
					newUsers.original = [...$users.original, fetchedData.data];
					newUsers.filterable = newUsers.original;
					newUsers.searchable = newUsers.original;
					newUsers.sliceable = newUsers.original;
					newUsers.entries = newUsers.original.length;
					newUsers.limit = newUsers.original.length;
					handleCancel();
					dispatch('request', newUsers);
				}
			}
		);
	}

	function handleCancel() {
		user = {
			name: '',
			number: '',
			campus: '',
			genre: '',
			active: '',
			phone: '',
			personalEmail: '',
			role: ''
		};

		$err = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<button class="create" slot="trigger" let:open on:click={open}>
		<div><Icon src={AccountPlus} /></div>
		<span>Usuario</span>
	</button>

	<!--Header-->
	<span slot="header"> Crear usuario </span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<UserContent bind:user />
		{#if $err}
			<ErrorToast bind:error={$err} />
		{/if}
		<!--
		{#if categories.length < 1}
			<WarningToast>Parece que no hay categorias, crea una antes de crear alumnos.</WarningToast>
		{/if}
		-->

		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button class="submit" type="submit">
				{#if $loading}
					<Loading />
				{:else}
					Crear
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

	button.create {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 1rem;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}
	button.create:hover {
		border: 2px solid var(--blue-color);
	}
	button.create:focus {
		border: 2px solid var(--green-color);
	}
	button.create:active {
		border: 2px solid var(--blue-color);
	}

	button.submit {
		width: 100%;
		padding: 1rem;
		background-color: var(--darker-green-color);
		border: 2px solid var(--green-color);
		cursor: pointer;
	}
	button.submit:hover {
		background: var(--green-color);
	}

	button.submit:active {
		background-color: var(--darker-green-color);
	}

	button.cancel {
		width: 100%;
		padding: 1rem;
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
