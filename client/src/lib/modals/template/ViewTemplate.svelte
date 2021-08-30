<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import File from '$lib/icons/file-document.svelte';

	export let template;

	// "http://africau.edu/images/default/sample.pdf#toolbar=0"
</script>

<template>
	<Modal>
		<button class="view" slot="trigger" let:open on:click={open}>
			<Icon src={File} />
			<span>{template.name}</span>
		</button>

		<!--Header-->
		<span slot="header"> Ver documento </span>

		<!--View-->
		<iframe
			slot="view"
			src={template.file === null
				? 'http://africau.edu/images/default/sample.pdf#toolbar=0'
				: URL.createObjectURL(template.file)}
			title="PDF"
		/>

		<!--Content-->
		<div class="content" slot="content">
			<div class="field">
				<div class="title">
					<div><Icon src={File} size={'32'} /></div>
					<div>{template.name}</div>
				</div>
			</div>
			<div class="field">
				<div class="tag">Descripción</div>
				<div>{template.description}</div>
			</div>
		</div>
	</Modal>
</template>

<style lang="scss">
	iframe {
		width: 1000px;
		height: 800px;
	}

	div {
		&.content {
			overflow-wrap: anywhere;
			width: 320px;
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
			gap: 6px;
			background-color: var(--input-color);
			border: 2px solid var(--border-color);
			border-right: none;

			&:hover {
				background-color: var(--area-color);
			}
		}
	}
</style>
