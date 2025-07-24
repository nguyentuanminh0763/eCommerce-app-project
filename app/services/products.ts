import { ProductType } from '@/types/type';

const API_URL = 'http://localhost:8000';

export async function getProducts(): Promise<ProductType[]> {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: number): Promise<ProductType | null> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product by ID');
    return await res.json();
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}
