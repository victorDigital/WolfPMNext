<script lang="ts">
	import QRCode from 'qrcode';
	import * as Card from '$lib/components/ui/card';

	export let product: PrintableItem;

	const generateQR = async (text: string) => {
		try {
			return await QRCode.toDataURL(text);
		} catch (err) {
			console.error(err);
			return;
		}
	};
</script>

<Card.Root
	class="page-break-after pointer-events-none invisible select-none border-black p-0 shadow-none print:visible"
>
	<Card.Header class="p-2">
		<div class="flex flex-row items-start justify-start">
			<div class="size-16">
				<img src="/image.png" alt="" class="max-h-16" />
			</div>
			<div class="ml-2 w-72">
				<Card.Title>{product.value}</Card.Title>
				<Card.Description class="font-mono text-xs">{product.sku}</Card.Description>
			</div>
		</div>
	</Card.Header>
	<Card.Content class="px-2 py-0">
		<div class="text-2xl font-bold">
			{@html product.price}
		</div>
	</Card.Content>
	<Card.Footer class="px-2 pb-2 pt-0">
		<div class="flex w-full items-end justify-between">
			<div class="size-10 overflow-hidden grayscale filter">
				{@html product.thumb_html}
			</div>
			<div class="flex items-center">
				<p class="w-20 text-right text-xs">Scan Qr-koden for mere infomation:</p>
				<div class="size-16">
					{#await generateQR(product.url || '') then qr}
						<img src={qr} alt="qr" />
					{/await}
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
