<script>
	export let src;
	export let size = '24';
	export let width = size || '24';
	export let height = size || '24';
	export let name = '';
	export let color = 'currentColor';
	export let stroke = false;
	export let fill = true;

	// FOR CHECKBOX INPUT
	export let isCheckbox = false;
	export let isChecked = false;

	// FOR DROPDOWN
	export let rotate = false;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{width}
	{height}
	viewBox="0 0 24 24"
	aria-labelledby={name}
	role="presentation"
	class:rotate
	class={isCheckbox ? (isChecked ? '' : 'isNotChecked') : ''}
>
	<title id={name} lang="en">{name} icon</title>
	<g stroke={stroke ? color : ''} fill={fill ? color : ''}>
		<svelte:component this={src} />
	</g>
</svg>

<style>
	svg {
		transition: all 0.2s ease;
	}

	svg.isNotChecked {
		display: none;
	}

	svg.rotate {
		transform: rotate(180deg);
	}
</style>
