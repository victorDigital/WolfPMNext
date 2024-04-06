<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<main class="container px-10 mx-auto">
	<slot>
		<p>something went wrong</p>
	</slot>
</main>
