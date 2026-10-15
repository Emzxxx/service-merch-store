<script lang="ts">
    import { supabase } from '$lib/supabaseClient';
    import type { Product, Category } from "$lib/types.js";
    import HomepageBg from '$lib/assets/homepage-bg.png';
    import Carousel from "$lib/components/Carousel/Carousel.svelte";
    import RightArrow from "$lib/assets/right-arrow-thin.svg";

    console.log(supabase)
    let exampleCategories = $state<Category[]> ([
        {
            id: 1,
            category: "Uno"
        },
        {
            id: 2,
            category: "Dosss"
        },
        {
            id: 3,
            category: "Tresssss"
        }
    ])

    let exampleProducts = $state<Product[]> ([
		{
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 1", 
            category: 'Tresssss', 
            stock_amount: 1, 
		},
		{
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 2", 
            category: 'Tresssss', 
            stock_amount: 1, 
		},
		{
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 3", 
            category: 'Dosss', 
            stock_amount: 1, 
		},
		{
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 4", 
            category: 'Uno', 
            stock_amount: 1, 
		},
		{
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 5", 
            category: 'Dosss', 
            stock_amount: 1, 
		},
        {
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 6", 
            category: 'Uno', 
            stock_amount: 1, 
		},
		{
			id: 1,
            image: null,
			price: 100, 
			name: "RANDOM MERCH THINGY 7", 
            category: 'Dosss', 
            stock_amount: 1, 
		}
	]);
    
    let allCategory: Category = {id: 0, category: "All"}
    let selectedCategory = $state(allCategory)
    let selectedProducts = $derived(
        exampleProducts.filter((product) => {
            return product.category == selectedCategory.category
        })
    );

</script>

<div class="relative w-full h-60 md:h-80 overflow-hidden z-0">
    <img src="{HomepageBg}" alt="Homepage Banner" class="w-full h-full object-cover object-[50%_40%]"/>
</div>

<div class="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between border-b-2 border-gray-300">
    <nav class="flex space-x-8" >
        <button
            onclick={() => (selectedCategory = allCategory)}
            class="whitespace-nowrap text-sm font-medium transition-colors relative pb-3 px-2
                {selectedCategory.id === 0
                ? 'text-csi-blue font-semibold border-b-3 border-csi-blue'
                : 'text-gray-500 hover:text-gray-700'}"
        >
            All
        </button>
        {#each exampleCategories as category}
            <button
                onclick={() => (selectedCategory = category)}
                class="whitespace-nowrap text-sm font-medium transition-colors relative pb-3 px-2
                    {selectedCategory.id === category.id
                    ? 'text-csi-blue font-semibold border-b-3 border-csi-blue'
                    : 'text-gray-500 hover:text-gray-700'}"
            >
                {category.category}
            </button>
        {/each}
    </nav>
    <a
        href="/catalog"
        class="group inline-flex items-center gap-1.5 pb-3 text-sm font-normal text-gray-500 transition-colors hover:text-gray-700"
    >
        <span>Go to All Products</span>
        <img src={RightArrow} class="w-4 h-4 align-middle opacity-60" alt="Button" />
	</a>
</div></div>

{#if selectedCategory.id == 0}
<Carousel products={exampleProducts}></Carousel>
{:else}
<Carousel products={selectedProducts}></Carousel>
{/if}