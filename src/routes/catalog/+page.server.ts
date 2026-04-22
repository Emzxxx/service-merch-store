import { supabase } from '$lib/supabaseClient';
import type { Product, Category } from '$lib/types'

export async function load(): Promise<{
	products: Product[],
	categories: Category[]
}> {
	
	const [ variantResult, categoryResult ] = await Promise.all([
		supabase
		.from('Variant')
		.select(`
			id,
			ImageLink,
			SellingPrice,
			VariantName,
			StockAmount,
			Products!inner(
				id,
				Category!inner(
					id,
					Category
				)
			)
		`)
		.eq('Active', true)
		
		,
		
		supabase
		.from('Category')
		.select(`id, Category`)
	])
	
	const { data: variantData, error: variantError } = variantResult
	const { data: categoryData, error: categoryError } = categoryResult


	if (variantError) {
		console.error('Supabase Variant error:', variantError);
		return { products: [], categories: [] };
	}

	if (categoryError) {
		console.error('Supabase Category error:', categoryError);
		return { products: [], categories: [] };
	}

	//console.log('RAW FIRST ROW:', JSON.stringify(data?.[0], null, 2));

	const products: Product[] = (variantData ?? []).map((variant) => {
		const product = Array.isArray(variant.Products)
			? variant.Products[0]
			: variant.Products;

		const category = Array.isArray(product?.Category)
			? product.Category[0]
			: product?.Category;

		return {
			id: variant.id ?? 0,
			image: variant.ImageLink ?? null,
			price: Number(variant.SellingPrice) || 0,
			name: variant.VariantName ?? 'Unnamed Variant',
			category: category?.Category ?? 'No Category',
			stock_amount: variant.StockAmount ?? 0
		};
	});

	const categories: Category[] = (categoryData ?? []).map((categ) => ({
		id: categ.id,
		category: categ.Category
	}));

	return { products, categories };
}