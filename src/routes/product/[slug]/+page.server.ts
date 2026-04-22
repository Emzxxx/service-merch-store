import { supabase } from '$lib/supabaseClient';
import type { Product } from '$lib/types'

export async function load({ params }): Promise<{ product: Product | null }> {
    const { slug } = params;
    const [ variantResult ] = await Promise.all([
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
        .eq('id', slug)
        .eq('Active', true)
    ])
    
    const { data: variantData, error: variantError } = variantResult

    if (variantError) {
        console.error('Supabase Variant error:', variantError);
        return { product: null };
    }

    //console.log('RAW FIRST ROW:', JSON.stringify(data?.[0], null, 2));

    const product: Product | null = {
        id: variantData?.[0]?.id ?? 0,
        image: variantData?.[0]?.ImageLink ?? null,
        price: Number(variantData?.[0]?.SellingPrice) || 0,
        name: variantData?.[0]?.VariantName ?? 'Unnamed Variant',
        category: variantData?.[0]?.Products?.[0]?.Category?.[0]?.Category ?? 'No Category',
        stock_amount: variantData?.[0]?.StockAmount ?? 0
    };

    return { product };
}