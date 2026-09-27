<script lang="ts">
import { supabase } from '$lib/supabaseClient';
import type { Product } from "$lib/types.js";
import homepage_bg from '$lib/assets/homepage-bg.png';
import Carousel from "$lib/components/Carousel/Carousel.svelte";

console.log(supabase)
let exampleProducts = $state<Product[]> ([
		{
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 1", 
            category: 'Sticker', 
            stock_amount: 1, 
		},
		{
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 2", 
            category: 'Sticker', 
            stock_amount: 1, 
		},
		{
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 3", 
            category: 'Sticker', 
            stock_amount: 1, 
		},
		{
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 4", 
            category: 'Sticker', 
            stock_amount: 1, 
		},
		{
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 5", 
            category: 'Sticker', 
            stock_amount: 1, 
		},
        {
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 6", 
            category: 'Sticker', 
            stock_amount: 1, 
		},
		{
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 7", 
            category: 'Sticker', 
            stock_amount: 1, 
		}
	]);

</script>

<div class="relative w-full h-60 md:h-80 overflow-hidden z-0">
    <img src="{homepage_bg}" alt="Homepage Banner" class="w-full h-full object-cover object-[50%_40%]"/>
</div>
<Carousel products={exampleProducts}></Carousel>