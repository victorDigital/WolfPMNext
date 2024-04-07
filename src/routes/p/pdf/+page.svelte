<script lang="ts">
	import { page } from '$app/stores';
	import PriceCard from '$lib/customComps/PriceCard.svelte';
	import { onMount } from 'svelte';

	let ready = false;
	let data: PrintableItem[] = [];
	let pages: PrintableItem[][] = [];
	onMount(async () => {
		data = JSON.parse(localStorage.getItem('printables') || '') || [];
		// if a product has more than one amount, duplicate it in the array
		data = data.flatMap((p) => {
			if (p.amount > 1) {
				return Array.from({ length: p.amount }, () => p);
			}
			return p;
		});
		ready = true;
		console.log('mounted');

		//split the data into pages each page has 10 items
		pages = [];
		for (let i = 0; i < data.length; i += 10) {
			pages.push(data.slice(i, i + 10));
		}

		await new Promise((resolve) => setTimeout(resolve, 1000));
		print();
		//close the window
		window.close();
	});
</script>

{#if ready}
	{#each pages as page, i}
		{#if i !== 0}
			<div class="pagebreakafter"></div>
		{/if}
		<div class="grid grid-cols-2 gap-4">
			{#each page as product, i}
				<PriceCard {product} />
			{/each}
		</div>
		<br />
		<p>Pris skilte blev genereret af PricePress som er udviklet af Victor Østergaard Nielsen</p>
	{/each}
{:else}
	<p>Loading...</p>
{/if}

<style>
	.pagebreakafter {
		page-break-after: always;
	}
</style>
