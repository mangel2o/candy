<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Alert from '$lib/Icons/alert.svelte';
</script>

<template>
	<div class="container">
		<Icon src={Alert} size={'100'} />
		<div class="text">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
	div {
		&.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-width: 26rem;
			gap: 1rem;
		}

		&.text {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.25rem;
		}
	}
</style>
