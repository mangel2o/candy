<script lang="ts">
	import ProfileDropdown from '$lib/components/ProfileDropdown.svelte';
	import { userStore } from '$lib/stores';
</script>

<template>
	<!--NAVIGATION BAR-->
	<nav>
		<!--NAVIGATION LINKS-->
		<div class="container">
			<a href="/">
				<img src="/logo_tecmilenio.svg" alt="Logo Tecmilenio" width="140" />
			</a>
			<div class="nav-btns">
				{#if $userStore}
					{#if $userStore.role === 'admin'}
						<a href="/recent">Actividad</a>
						<a href="/candidates">Candidatos</a>
						<a href="/documents">Documentos</a>
						<a href="/admin">Administración</a>
					{:else if $userStore.role === 'moderator'}
						<a href="/recent">Actividad</a>
						<a href="/candidates">Candidatos</a>
						<a href="/documents">Documentos</a>
					{:else}
						<a href="/pending">Pendientes</a>
						<a href="/candidate">Tu Perfil</a>
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
</template>

<style lang="scss">
	$height: 64px;

	nav {
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
		background-color: var(--area-color);
		align-items: center;
		height: $height;
	}

	a {
		display: flex;
		align-items: center;
		padding: calc(#{$height} / 2) 0;
		&:hover {
			color: var(--placeholder-color);
		}
	}

	div {
		&.container {
			display: flex;
			gap: 20px;
			align-items: inherit;
		}

		&.nav-btns {
			display: flex;
			gap: 20px;
			align-items: inherit;
		}
	}
</style>
