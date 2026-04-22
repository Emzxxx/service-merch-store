export type Product = {
    id: number;
    image: string | null;
    price: number;
    name: string;
    category: string;
    stock_amount: number;
}

export type Category = {
    id: number
    category: string
}