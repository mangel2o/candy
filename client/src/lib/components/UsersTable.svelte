<script>
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import Icon from '$lib/components/Icon.svelte';
	import OpenInNew from '$lib/icons/open-in-new.svelte';

	export let users;

	$: users.sliceable = users.searchable.slice(0, users.entries);
</script>

<table in:fade={{ duration: 200 }}>
	<tr>
		<th class="id">ID</th>
		<th class="name">Nombre</th>
		<th class="number">Matricula</th>
		<th class="role">Ról</th>
		<th class="campus">Campus</th>
		<th class="link">Ver</th>
	</tr>
	{#each users.sliceable as user, i}
		<tr transition:fade|local={{ duration: 200 }}>
			<td class="id">{i + 1}</td>
			<td class="name">{user.name}</td>
			<td class="number">{user.number}</td>
			<td class="role">{user.role}</td>
			<td class="campus">{user.campus}</td>
			<td class="link">
				<button on:click={() => goto(`/users/${user._id}`)}>
					<span><Icon src={OpenInNew} /></span>
				</button>
			</td>
		</tr>
	{/each}
</table>

<style>
	table {
		width: 100%;
		border-color: var(--border-color);
		border-collapse: collapse;
		background-color: var(--input-color);
	}

	tr {
		outline: none;
		border: 2px solid var(--border-color);
	}
	tr:hover {
		background-color: var(--area-color);
	}

	th {
		font-weight: bold;
		text-align: center;
		background-color: var(--area-color);
	}
	th,
	td {
		text-align: left;
		vertical-align: middle;
		padding: 0 30px;
		height: 56px;
	}

	th.id,
	td.id {
		max-width: 40px;
	}

	th.name,
	td.name {
		max-width: 300px;
	}

	th.number,
	td.number {
		max-width: 120px;
	}

	th:last-child,
	td:last-child {
		text-align: center;
	}

	button {
		cursor: pointer;
		background-color: var(--area-color);
		border: 2px solid var(--border-color);
		padding: 0.5rem;
	}

	button:hover {
		background-color: var(--input-color);
		border: 2px solid var(--blue-color);
	}

	button span {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.id {
		width: 6%;
	}

	.name {
		width: 20%;
	}

	.number {
		width: 10%;
	}

	.role {
		width: 8%;
	}

	.campus {
		width: 10%;
	}

	.link {
		width: 8%;
	}
</style>
