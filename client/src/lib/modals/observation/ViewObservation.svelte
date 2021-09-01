<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import CommentText from '$lib/icons/comment-text.svelte';

	export let observation;
</script>

<template>
	<Modal>
		<button class="view" slot="trigger" let:open on:click={open}>
			<Icon src={CommentText} />
			<span>{observation.name}</span>
		</button>

		<!--Header-->
		<span slot="header"> Ver observación </span>

		<!--Content-->
		<div class="content" slot="content">
			<div class="field">
				<div class="title">
					<div><Icon src={CommentText} size={'32'} /></div>
					<div>{observation.name}</div>
				</div>
			</div>
			<div class="field">
				<div class="tag">Comentario</div>
				<div>{observation.comment}</div>
			</div>
		</div>
	</Modal>
</template>

<style lang="scss">
	div {
		&.content {
			overflow-wrap: anywhere;
			width: 38rem;
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
