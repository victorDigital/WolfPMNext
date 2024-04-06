interface TaxonomyItem {
	term_id: string;
	taxonomy: string;
	value: string;
	url: string;
	image_src: string;
	breadcrumbs: string;
	count: string;
	type: 'taxonomy';
	score: number;
}

interface ProductItem {
	post_id: string;
	value: string;
	url: string;
	thumb_html: string;
	price: string;
	desc: string;
	sku: string;
	on_sale: boolean;
	featured: boolean;
	type: 'product';
}

interface MoreProductsItem {
	total: number;
	type: 'more_products';
}

type ItemType = 'headline' | 'taxonomy' | 'product' | 'more_products';

interface Item {
	[x: string]: any;
	value: string;
	type: ItemType;
	term_id?: string;
	taxonomy?: string;
	url?: string;
	image_src?: string;
	breadcrumbs?: string;
	count?: string;
	score?: number;
	post_id?: string;
	thumb_html?: string;
	price?: string;
	desc?: string;
	sku?: string;
	on_sale?: boolean;
	featured?: boolean;
	total?: number;
}

// PrintableItem is a an Item with a amount property
interface PrintableItem extends Item {
	amount: number;
}

interface SearchResults {
	suggestions: Array<Item>;
	total: number;
	tntTime: string;
	time: string;
	engine: string;
	v: string;
}
