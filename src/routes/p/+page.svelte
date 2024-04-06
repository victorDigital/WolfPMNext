<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { products } from '$lib/js/store';
	import * as Table from '$lib/components/ui/table';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { Plus, Minus, TrashIcon, EllipsisVertical as Dots } from 'lucide-svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import ProductCard from '$lib/customComps/ProductCard.svelte';
	import { goto } from '$app/navigation';

	let ready = false;
	let printables: PrintableItem[] = [];
	onMount(() => {
		if (typeof $products === 'undefined' || !Array.isArray($products)) {
			$products = [];
		}

		printables = $products.map((p) => {
			return {
				...p,
				amount: 1
			};
		});
		ready = true;
	});

	function removeItem(index: number) {
		printables = printables.filter((_, i) => i !== index);
		//also remove from store make sure to strip the amount
		$products = printables.map((p) => {
			return {
				...p,
				amount: null
			};
		});
	}

	function increaseAmount(index: number) {
		printables[index].amount++;
	}

	function decreaseAmount(index: number) {
		if (printables[index].amount > 1) {
			printables[index].amount--;
		}
	}

	function printToPDF() {
		console.log('print to pdf');
		localStorage.setItem('printables', JSON.stringify(printables));
		window.open('/p/pdf', '_blank');
	}
</script>

{#if ready}
	<!-- content here -->
	<div class="mx-0 md:container md:mx-auto">
		{#if printables.length === 0}
			<p>
				Ingen produkter er tilføjet til print endnu. Søg efter produkter og tilføj dem til print.
			</p>
		{:else}
			<Table.Root class="w-full">
				<Table.Caption>Genereret kl. {new Date().toLocaleTimeString()}</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[36px]"></Table.Head>
						<Table.Head class="hidden md:table-cell">SKU</Table.Head>
						<Table.Head>Produkt</Table.Head>
						<Table.Head></Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each printables as printableItem, i}
						<!-- content here -->
						<Table.Row>
							<Table.Cell>
								<div class="size-9 overflow-hidden">
									{@html printableItem.thumb_html}
								</div>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">{printableItem.sku}</Table.Cell>
							<Table.Cell>
								<HoverCard.Root>
									<HoverCard.Trigger class="hover:underline"
										>{printableItem.value}</HoverCard.Trigger
									>
									<HoverCard.Content class="rounded-xl border-0 p-0">
										<ProductCard product={printableItem} showDelete={false} />
									</HoverCard.Content>
								</HoverCard.Root>
							</Table.Cell>
							<Table.Cell>
								<div class="hidden justify-end md:flex">
									<Button
										class="rounded-r-none "
										variant="outline"
										size="icon"
										on:click={() => decreaseAmount(i)}
									>
										<Minus class="size-4" />
									</Button>
									<Input
										class="w-20 rounded-none border-x-0"
										type="number"
										bind:value={printableItem.amount}
									/>
									<Button
										class="rounded-l-none "
										variant="outline"
										size="icon"
										on:click={() => increaseAmount(i)}
									>
										<Plus class="size-4" />
									</Button>
									<Button
										class="ml-2"
										variant="destructive"
										size="icon"
										on:click={() => removeItem(i)}
									>
										<TrashIcon class="size-4" />
									</Button>
								</div>
								<div class="flex justify-end md:hidden">
									<Drawer.Root>
										<Drawer.Trigger>
											<Button variant="outline" size="icon">
												<Dots class="size-4" />
											</Button>
										</Drawer.Trigger>
										<Drawer.Content>
											<Drawer.Header>
												<Drawer.Title>Reguler mængde</Drawer.Title>
												<Drawer.Description>
													Reguler mængden af printede prisskilte
												</Drawer.Description>
											</Drawer.Header>
											<div class="my-20 flex h-10 justify-center">
												<Button
													class="rounded-r-none "
													variant="outline"
													size="icon"
													on:click={() => decreaseAmount(i)}
												>
													<Minus class="size-4" />
												</Button>
												<Input
													class="w-20 rounded-none border-x-0"
													type="number"
													bind:value={printableItem.amount}
												/>
												<Button
													class="rounded-l-none "
													variant="outline"
													size="icon"
													on:click={() => increaseAmount(i)}
												>
													<Plus class="size-4" />
												</Button>
												<Drawer.Close>
													<Button
														class="ml-2"
														variant="destructive"
														size="icon"
														on:click={() => removeItem(i)}
													>
														<TrashIcon class="size-4" />
													</Button>
												</Drawer.Close>
											</div>
											<Drawer.Footer>
												<Drawer.Close>Tilbage</Drawer.Close>
											</Drawer.Footer>
										</Drawer.Content>
									</Drawer.Root>
								</div>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
			<div class="mt-4 flex justify-end gap-4">
				<Button on:click={printToPDF}>Generer PDF</Button>
				<Button variant="outline" href="/a/home">Tilbage</Button>
			</div>
		{/if}
	</div>
{:else}
	<p>Loading...</p>
{/if}
