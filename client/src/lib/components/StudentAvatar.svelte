<script>
	import Account from '$lib/icons/account.svelte';

	import Icon from './Icon.svelte';

	// your script goes here
</script>

<div class="avatar">
	<Icon src={Account} size={'96'} />
</div>

<!-- markup (zero or more items) goes here -->
<style>
	div.avatar {
		width: 12rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	div.avatar {
		background-color: var(--area-color);
		border: 2px solid var(--border-color);
	}
</style>
