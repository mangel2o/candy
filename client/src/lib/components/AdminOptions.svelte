<script>
	import DeleteUser from '$lib/modals/admin/DeleteUser.svelte';
	import EditUser from '$lib/modals/admin/EditUser.svelte';
	import { getContext } from 'svelte';

	let user = getContext('user');
</script>

<div class="options">
	<div class="upper">
		<EditUser bind:user={$user} />
		<DeleteUser />
	</div>
</div>

<style>
	div.options {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	div.upper {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
