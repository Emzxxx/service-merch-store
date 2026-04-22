<script lang="ts">
	import { page } from '$app/state';
	import placeholder from '$lib/components/Card/placeholder.svg';
	import VerticalGallery from '$lib/components/ProductDetail/VerticalGallery.svelte';
	import MainDisplay from '$lib/components/ProductDetail/MainDisplay.svelte';
	import ProductSidebar from '$lib/components/ProductDetail/ProductSidebar.svelte';
	import type { Product } from "$lib/types.js";

	let { data } = $props<{ data: { product: Product | null } }>();
	const images = [placeholder, placeholder, placeholder, placeholder];
	let selectedImage = $state(images[0]);
	let quantity = $state(1);

	const product = $derived(data.product);

	function incrementQuantity() {
		if (quantity < product.stock_amount) {
			quantity += 1;
		}
	}

	function decrementQuantity() {
		quantity = Math.max(1, quantity - 1);
	}
</script>

<div class="product-layout">
	<VerticalGallery {images} {selectedImage} onSelect={(image) => (selectedImage = image)} />

	<MainDisplay
		image={selectedImage}
		description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product details and variant notes can go here."
	/>

	<ProductSidebar
		name={product.name}
		price={product.price}
		{quantity}
		onIncrement={incrementQuantity}
		onDecrement={decrementQuantity}
	/>
</div>

<style>
	.product-layout {
		max-width: 1100px;
		margin: 2rem auto;
		padding: 0 1rem;
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) 18rem;
		gap: 1.75rem;
		align-items: start;
	}

	@media (max-width: 1100px) {
		.product-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
