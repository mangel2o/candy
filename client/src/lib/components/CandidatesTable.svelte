<script>
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import OpenInNew from '$lib/icons/open-in-new.svelte';

	export let candidates = [];
</script>

<template>
	<table>
		<tr>
			<th>ID</th>
			<th class="name">Nombre</th>
			<th>Matricula</th>
			<th>Genero</th>
			<th>Terminación</th>
			<th>Estatus</th>
			<th>Ver</th>
		</tr>
		{#each candidates as candidate}
			<tr>
				<td>{candidate.id}</td>
				<td class="name">{candidate.name}</td>
				<td>{candidate.number}</td>
				<td>{candidate.genre}</td>
				<td>{candidate.terminationPeriod} {candidate.terminationYear}</td>
				<td>{candidate.status}</td>
				<td>
					<button on:click={() => goto(`/candidates/${candidate.number}/documents`)}>
						<span><Icon src={OpenInNew} /></span>
					</button>
				</td>
			</tr>
		{/each}
	</table>
</template>

<style lang="scss">
	table {
		width: 100%;
		border-color: var(--border-color);
		border-collapse: collapse;
		background-color: var(--input-color);

		tr {
			outline: none;
			border: 2px solid var(--border-color);

			&:hover {
				background-color: var(--area-color);
			}

			th {
				background-color: var(--area-color);
			}

			th,
			td {
				text-align: left;
				vertical-align: middle;
				padding: 0 30px;
				height: 56px;

				&:last-child {
					text-align: center;
				}
			}

			td.name {
				max-width: 300px;
			}
		}

		button {
			cursor: pointer;
			background-color: var(--area-color);
			border: 2px solid var(--border-color);
			padding: 0.5rem;

			&:hover {
				background-color: var(--input-color);
				border: 2px solid var(--blue-color);
			}

			span {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
