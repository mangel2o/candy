<script>
	import { createEventDispatcher } from 'svelte';
	export let exclude = [];
	export let fullWidth = false;
	let child;
	const dispatch = createEventDispatcher();

	function isExcluded(target) {
		var parent = target;
		while (parent) {
			if (exclude.indexOf(parent) >= 0 || parent === child) {
				return true;
			}
			parent = parent.parentNode;
		}

		return false;
	}

	function onClickOutside(event) {
		if (!isExcluded(event.target)) {
			dispatch('clickoutside');
		}
	}
</script>

<svelte:body on:click={onClickOutside} />
<div class:fullWidth bind:this={child}>
	<slot />
</div>

<style>
	div.fullWidth {
		width: 100%;
	}
</style>
