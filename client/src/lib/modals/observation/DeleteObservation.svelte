<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Delete from '$lib/icons/delete.svelte';
	import DeleteContent from '$lib/modals/DeleteContent.svelte';
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';

	let refetch: Function = getContext('refetch');
	let isOpen = false;
	let isPending = false;
	let errorObservation;

	export let observation;

	async function handleSubmit() {
		isPending = true;
		const formData = new FormData();
		Object.keys(observation).forEach((key) => formData.append(key, observation[key]));

		fetch(
			`http://localhost:4000/candidates/${$page.params.candidate}/archives/${observation.name}`,
			{
				method: 'DELETE',
				body: formData
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});

		handleCancel();
		refetch();
	}

	function handleCancel() {
		isOpen = false;
	}
</script>

<template>
	<Modal bind:isOpen>
		<!--Button-->
		<button class="delete" slot="trigger" let:open on:click={open}>
			<Icon src={Delete} />
		</button>

		<!--Header-->
		<span class="header" slot="header"> Eliminar observación </span>

		<!--Content-->
		<form on:submit|preventDefault={handleSubmit} slot="content">
			<DeleteContent bind:error={errorObservation} prop={'esta observación'} />
			<div>
				<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
				<button class="submit" type="submit"> Eliminar </button>
			</div>
		</form>
	</Modal>
</template>

<style lang="scss">
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

		&.delete {
			cursor: pointer;
			display: flex;
			align-items: center;
			background-color: var(--input-color);

			border: 2px solid var(--border-color);
			border-left: none;

			&:hover {
				background-color: var(--area-color);
			}
		}

		&.submit {
			width: 100%;
			background-color: var(--red-color);
			border: 2px solid var(--red-color);
			cursor: pointer;

			&:hover {
				background: var(--red-color);
			}

			&:active {
				background-color: var(--red-color);
			}
		}

		&.cancel {
			width: 100%;
			background-color: var(--input-color);
			border: 2px solid var(--border-color);
			cursor: pointer;

			&:hover {
				background: var(--area-color);
			}

			&:active {
				background-color: var(--input-color);
			}
		}
	}
</style>
