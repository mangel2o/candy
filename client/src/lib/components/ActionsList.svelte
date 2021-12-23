<script>
	import ActionModal from '$lib/modals/ActionModal.svelte';
	export let actions;
</script>

{#each actions as action}
	<ActionModal {action} />
{:else}
	Seems like there are no items
{/each}
