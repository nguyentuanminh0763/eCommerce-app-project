export interface ProductType {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: Category;
}

interface Category {
    id: number;
    name: string;
    image: string;
}

export interface CategoryType {
    id: number;
    name: string;
    image: string;
}

export interface CartItemType {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

export interface NotificationType {
    title: string;
    message: string;
    timestamp: string;
    userName: string;
    product: any;
}
