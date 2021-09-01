<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Plus from '$lib/icons/plus.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { getContext, onMount } from 'svelte';
	import ObservationContent from './ObservationContent.svelte';

	let refetch: Function = getContext('refetch');

	let observation = {
		name: '',
		observation: ''
	};
	let isOpen = false;

	function handleSubmit() {
		console.log(observation);
		handleCancel();
		refetch();
	}

	function handleCancel() {
		observation = {
			name: '',
			observation: ''
		};

		isOpen = false;
	}

	onMount(() => {});
</script>

<template>
	<Modal bind:isOpen>
		<button class="create" slot="trigger" let:open on:click={open}>
			<Icon src={Plus} />
			<span>Crear observación</span>
		</button>

		<!--Header-->
		<span slot="header"> Crear observación </span>

		<!--Content-->
		<form on:submit|preventDefault={handleSubmit} slot="content">
			<ObservationContent bind:observation />
			<div>
				<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
				<button class="submit" type="submit"> Crear </button>
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
		&.create {
			width: 100%;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 6px;
			padding: 1rem;
			background-color: var(--input-color);
			border: 2px solid var(--border-color);
			&:hover {
				background-color: var(--area-color);
				border: 2px solid var(--blue-color);
			}
			&:focus {
				border: 2px solid var(--green-color);
			}
			&:active {
				border: 2px solid var(--blue-color);
			}
		}

		&.submit {
			width: 100%;
			padding: 1rem;
			background-color: var(--darker-green-color);
			border: 2px solid var(--green-color);
			cursor: pointer;

			&:hover {
				background: var(--green-color);
			}

			&:active {
				background-color: var(--darker-green-color);
			}
		}

		&.cancel {
			width: 100%;
			padding: 1rem;
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
