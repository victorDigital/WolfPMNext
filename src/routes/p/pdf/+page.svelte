<script lang="ts">
	import PriceCard from '$lib/customComps/PriceCard.svelte';
	import { onMount } from 'svelte';

	let ready = false;
	let data: PrintableItem[] = [];
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
		await new Promise((resolve) => setTimeout(resolve, 1000));
		print();
		//close the window
		window.close();
	});
</script>

{#if ready}
	<div class="grid grid-cols-2 gap-4">
		{#each data as product}
			<PriceCard {product} />
		{/each}
	</div>
{:else}
	<p>Loading...</p>
{/if}
