export type Product = {
    id: number;
    image: string | null;
    gallery: string[];
    price: number;
    name: string;
    category: string;
    stock_amount: number;
}

export type Category = {
    id: number
    category: string
}