export interface Laptop {
    id: string;
    title: string;
    description: string;
    price: number;
    processor: string;
    graphics: string;
    ssd: string;
    imageUrl?: string;
}

interface FetchLaptopsParams {
    search?: string;
    sortBy?: 'price' | 'title' | 'processor' | 'ssd';
    sortOrder?: 'asc' | 'desc';
    filters?: {
        processor?: string;
        graphics?: string;
        ssd?: string;
        priceRange?: [number, number];
    };
    page?: number;
    limit?: number;
}

const API_BASE_URL = 'https://laptop-api-tg2j.onrender.com';

export async function fetchLaptops(params: FetchLaptopsParams = {}): Promise<Laptop[]> {
    const query = new URLSearchParams();

    if (params.search) query.append('q', params.search);

    if (params.sortBy) {
        query.append('_sort', params.sortBy);
        query.append('_order', params.sortOrder || 'asc');
    }

    if (params.page !== undefined && params.limit !== undefined) {
        const start = (params.page - 1) * params.limit;
        query.append('_start', start.toString());
        query.append('_limit', params.limit.toString());
    }

    // Фільтри (приклад для json-server)
    if (params.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
            if (value) {
                if (Array.isArray(value)) {
                } else {
                    query.append(key, value);
                }
            }
        });
    }

    const url = `${API_BASE_URL}/laptops?${query.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch laptops');
    }

    const data = await response.json();

    return data;
}
