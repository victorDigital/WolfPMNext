import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { q } = params;
	const data = await fetchSearchResults(q);
	return {
		results: data,
		filtered: data.suggestions.filter((product) => product.type === 'product'),
		q
	};
}) satisfies PageServerLoad;

async function fetchSearchResults(q: string) {
	const url = `https://wolftac.dk/search.php?s=${q}`;
	const res = await fetch(url);
	const data: SearchResults = await res.json();
	return data;
}
