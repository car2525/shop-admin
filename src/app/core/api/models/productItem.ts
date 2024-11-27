export interface ProductItem { 
    title: string;
    category: string;
    price: number;
    employee?: string;
    description?: string;
    reviews?: Array<string>;
}