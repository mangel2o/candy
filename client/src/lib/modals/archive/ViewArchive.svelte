<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Archive from '$lib/icons/archive.svelte';
	import { onDestroy } from 'svelte';

	export let archive;

	// "http://africau.edu/images/default/sample.pdf#toolbar=0"
	onDestroy(() => {
		URL.revokeObjectURL(archive.file);
	});
</script>

<template>
	<Modal>
		<button class="view" slot="trigger" let:open on:click={open}>
			<Icon src={Archive} />
			<span>{archive.name}</span>
		</button>

		<!--Header-->
		<span slot="header"> Ver archivo </span>

		<!--View-->
		<iframe slot="view" src={URL.createObjectURL(archive.file) + '#toolbar=0'} title="PDF" />

		<!--Content-->
		<div class="content" slot="content">
			<div class="field">
				<div class="title">
					<Icon src={Archive} size={'32'} />
					<div>{archive.name}</div>
				</div>
			</div>
			<div class="field">
				<div class="tag">Descripción</div>
				<div>{archive.description}</div>
			</div>
		</div>
	</Modal>
</template>

<style lang="scss">
	iframe {
		width: 60rem;
		height: 50rem;
	}

	div {
		&.content {
			overflow-wrap: anywhere;
			width: 22rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			padding: 0.5rem;
		}

		&.field {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		&.tag {
			color: var(--focus-color);
		}

		&.title {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: 1.2rem;
		}
	}

	button {
		padding: 1rem;

		&.view {
			cursor: pointer;
			display: flex;
			width: 100%;
			align-items: center;
			gap: 0.5rem;
			background-color: var(--input-color);

			&:hover {
				background-color: var(--area-color);
			}
		}
	}
</style>
