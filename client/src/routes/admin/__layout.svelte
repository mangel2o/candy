<script>
	import AdminLink from '$lib/components/AdminLink.svelte';
</script>

<svelte:head>
	<title>Administración • Tecmilenio</title>
</svelte:head>

<div class="container">
	<div class="links">
		<AdminLink path={`/admin`}>Responsables</AdminLink>
		<AdminLink path={`/admin/actions`}>Registro de acciones</AdminLink>
	</div>
	<div class="documents">
		<slot />
	</div>
</div>

<style>
	div.container {
		display: flex;
		gap: 20px;
	}

	div.links {
		display: flex;
		flex-direction: column;
		width: 25%;
	}

	div.documents {
		display: flex;
		flex-direction: column;
		width: 75%;
		gap: 20px;
	}
</style>
