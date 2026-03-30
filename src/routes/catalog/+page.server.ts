import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data, error } = await supabase
		.from('Variant')
		.select('*')
		.gt('SellingPrice', 0);

	if (error) {
		console.error('Supabase error:', error);
		return {
			products: []
		};
	}

	const products = (data ?? []).map((item) => ({
		image: item.ImageLink ?? null,
		price: Number(item.SellingPrice) || 0,
		name: item.VariantName ?? 'Unnamed Variant'
	}));

    
	return {
		products
	};
}