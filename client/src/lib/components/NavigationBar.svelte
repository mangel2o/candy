<script>
	import ProfileDropdown from '$lib/components/ProfileDropdown.svelte';
	import { userStore } from '$lib/stores';
</script>

<!--NAVIGATION BAR-->
<nav>
	<!--NAVIGATION LINKS-->
	<div class="container">
		<a href="/">
			<img src="/logo_tecmilenio.svg" alt="Logo Tecmilenio" width="140" />
		</a>
		<div class="nav-btns">
			{#if $userStore}
				<a href="/">Inicio</a>
				{#if $userStore.role === 'admin'}
					<a href="/students">Alumnos</a>
					<a href="/documents">Documentos</a>
					<a href="/admin">Administración</a>
				{:else if $userStore.role === 'moderator'}
					<a href="/students">Alumnos</a>
					<a href="/documents">Documentos</a>
				{:else}
					<a href={`/students/${$userStore.studentId}/documents`}>Tu Perfil</a>
				{/if}
			{:else}
				<span>Cargando...</span>
			{/if}
		</div>
	</div>

	<!--DROPDOWN BUTTON-->
	{#if $userStore}
		<ProfileDropdown />
	{/if}
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
		background-color: var(--area-color);
		align-items: center;
		height: 64px;
	}

	a {
		display: flex;
		align-items: center;
		height: 64px;
	}

	a:hover {
		color: var(--placeholder-color);
	}

	div.container {
		display: flex;
		gap: 20px;
		align-items: inherit;
	}

	div.nav-btns {
		display: flex;
		gap: 20px;
	}
</style>
