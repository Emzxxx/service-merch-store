<script lang="ts">
    import placeholder from "../../../../static/placeholder.svg";

    let { image, price, name } = $props<{
        image: string | null; // path to image in Supabase
        price: number;
        name: string;
    }>();

    let imageUrl = $derived(image ?? placeholder);
</script>

<div class="flex flex-col overflow-hidden rounded-lg bg-white pb-4">
    <img 
        src={imageUrl} 
        onerror={() => { imageUrl = placeholder }}
        alt={name} 
        class="w-full h-48 object-cover shadow-sm"
        loading="lazy"
    />

    <div class="p-4">
        <h3 class="text-lg font-medium">{name}</h3>
        <p class="text-gray-600">₱{price.toLocaleString()}</p>
    </div>

    <button class="cursor-pointer w-2/3 mx-auto mt-auto text-sm px-auto py-1 border border-gray-300 text-gray-700 rounded-full hover:bg-black hover:text-white transition-colors">
        Buy
    </button>
</div>