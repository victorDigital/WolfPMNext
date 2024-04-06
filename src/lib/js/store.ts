import type { Writable } from 'svelte/store';
import { localStore } from './localStore';

export const products = localStore<Item[]>('products');
