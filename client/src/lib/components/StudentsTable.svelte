<script>
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import Icon from '$lib/components/Icon.svelte';
	import OpenInNew from '$lib/icons/open-in-new.svelte';

	export let students;
</script>

<table in:fade={{ duration: 200 }}>
	<tr>
		<th class="id">ID</th>
		<th class="name">Nombre</th>
		<th class="number">Matricula</th>
		<th class="level">Nivel</th>
		<th class="campus">Campus</th>
		<th class="termination">Terminación</th>
		<th class="status">Estatus</th>
		<th class="link">Ver</th>
	</tr>
	{#each students as student, i}
		<tr transition:fade|local={{ duration: 200 }}>
			<td class="id">{i + 1}</td>
			<td class="name">{student.name}</td>
			<td class="number">{student.number}</td>
			<td class="level">{student.level}</td>
			<td class="campus"> {student.campus}</td>
			<td class="termination">{student.terminationPeriod} {student.terminationYear}</td>
			<td class="status flex">
				<div class={student.status.toLowerCase()} />
				<span>{student.status}</span>
			</td>
			<td class="link">
				<button on:click={() => goto(`/students/${student._id}/documents`)}>
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

	.flex {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	div {
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 0.5rem;
	}

	div.vacio {
		background-color: var(--focus-color);
	}
	div.completo {
		background-color: var(--green-color);
	}
	div.pendiente {
		background-color: var(--yellow-color);
	}
	div.incompleto {
		background-color: var(--red-color);
	}
	div.retenido {
		background-color: var(--blue-color);
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
		width: 16%;
	}

	.number {
		width: 10%;
	}

	.level {
		width: 13%;
	}

	.campus {
		width: 18%;
	}

	.termination {
		width: 16%;
	}

	th.status {
		min-width: 12%;
		max-width: 12%;
	}

	.link {
		width: 8%;
	}
</style>
