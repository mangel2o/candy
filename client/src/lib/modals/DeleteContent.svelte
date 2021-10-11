<script>
	import Icon from '$lib/components/Icon.svelte';
	import Alert from '$lib/Icons/alert.svelte';
</script>

<div class="container">
	<Icon src={Alert} size={'100'} />
	<div class="text">
		<slot />
	</div>
</div>

<style>
	div.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 30rem;
		gap: 1rem;
	}

	div.text {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}
</style>
