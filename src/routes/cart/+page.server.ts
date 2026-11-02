import { supabase } from '$lib/supabaseClient';
import type { CartItem } from '$lib/types'
import { error, fail, json, type Actions } from '@sveltejs/kit';

export async function load({ locals }): Promise<{
    cartItems: CartItem[],
}> {

    const { data: { user }, error: userError } = await locals.supabase.auth.getUser()

    if (userError || !user) {
        console.log("Not logged in");
    }
    
    const [ shoppingCartResult ] = await Promise.all([
        locals.supabase
        .from('ShoppingCartItems')
        .select(`
            ID,
            Count,
            Variant!inner (
                VariantName,
                SellingPrice,
                ImagePath
            )
        `)
    ])
    
    const { data: cartData, error: cartError } = shoppingCartResult

    if (cartError) {
        console.error('Supabase Cart error:', cartError);
        return { cartItems: [] };
    }

    const cartItems: CartItem[] = (cartData ?? []).map((cartItem) => {
        const variant = Array.isArray(cartItem.Variant)
            ? cartItem.Variant[0]
            : cartItem.Variant;

        return {
            id: cartItem.ID ?? -1,
            count: cartItem.Count ?? 0,
            image: getUrl(variant.ImagePath) ?? null,
            price: Number(variant.SellingPrice) || 0,
            name: variant.VariantName ?? 'Unnamed Variant',
        };
    });

    return { cartItems };
}

function getUrl(path:string|null) {
    if (!path) {
        return null
    }
    const {data} = supabase.storage.from("Product Pictures").getPublicUrl(path);
    return data.publicUrl;
}

export const actions:Actions =  {

    
    addCartEntry:  async({locals: {supabase}, request}) => {
        
        const user = (await supabase.auth.getUser()).data.user

        if(!user) {
            return fail(401, "User is not logged in")
        }
        
        const data = await request.formData()
        const variant_id = Number(data.get("variant_id")?.toString() ?? '-1')
        const count = Number(data.get("count")?.toString() ?? '-1')

        const {error:insert_error} = await supabase.from("ShoppingCartItems").insert(
            {
                VariantID: variant_id,
                Count: count,
                UserID: user.id
            }
        )

        if(insert_error) {
            return fail(501, {message: insert_error.message})
        }
        else {
            return {success: true}
        }

    },

    deleteCartEntry: () => {},
    
    editCartEntry: () => {}

}