<script lang="ts">
	export let src;
	export let size = '24';
	export let width = size || '24';
	export let height = size || '24';
	export let name = '';
	export let color = 'currentColor';
	export let stroke: boolean = false;
	export let fill: boolean = true;

	//FOR CHECKBOX INPUT
	export let isCheckbox: boolean = false;
	export let isChecked: boolean = false;
</script>

<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		{width}
		{height}
		viewBox="0 0 24 24"
		aria-labelledby={name}
		role="presentation"
		class={isCheckbox ? (isChecked ? '' : 'isNotChecked') : ''}
	>
		<title id={name} lang="en">{name} icon</title>
		<g stroke={stroke ? color : ''} fill={fill ? color : ''}>
			<svelte:component this={src} />
		</g>
	</svg>
</template>

<style lang="scss">
	svg {
		&.isNotChecked {
			display: none;
		}
	}
</style>
