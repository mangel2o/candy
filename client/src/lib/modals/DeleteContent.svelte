<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Alert from '$lib/Icons/alert.svelte';
	export let prop = '';
	export let error;
</script>

<template>
	<div class="container">
		<Icon src={Alert} size={'100'} />
		<span class="text">
			¿Deseas eliminar {prop}?
			<br />
			Esta acción es irreversible
		</span>
		{#if error}
			<span class="warning">{error}</span>
		{/if}
	</div>
</template>

<style lang="scss">
	div {
		&.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-width: 24rem;
			gap: 1rem;
		}
	}

	span {
		&.text {
			color: var(--focus-color);
			text-align: center;
		}

		&.warning {
			color: var(--orange-color);
		}
	}
</style>
