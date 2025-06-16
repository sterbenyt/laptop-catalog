import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Laptop {
    id: string;
    title: string;
    description: string;
    price: number;
    brand: string;
    ram: number;
    ssd: string;
    cpu?: string;
    gpu?: string;
    imageUrl?: string;
    screenType?: string;
    screenResolution?: string;
    gallery?: string[];
}

export interface Filters {
    brand?: string[];
    ram?: number[];
    ssd?: string[];
    priceRange?: [number, number];
    sortBy?: 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc' ;
    query?: string;
}

interface LaptopsState {
    allLaptops: Laptop[];
    filteredLaptops: Laptop[];
    filters: Filters;
    currentPage: number;
    itemsPerPage: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: LaptopsState = {
    allLaptops: [],
    filteredLaptops: [],
    filters: {
        brand: [],
        ram: [],
        ssd: [],
        priceRange: [0, 100000],
        sortBy: undefined,
        query: '',
    },
    currentPage: 1,
    itemsPerPage: 10,
    status: 'idle',
    error: null,
};

export const fetchLaptops = createAsyncThunk(
    'laptops/fetchLaptops',
    async () => {
        const response = await axios.get<Laptop[]>('http://localhost:4000/laptops');
        return response.data;
    }
);

const applyFilters = (laptops: Laptop[], filters: Filters) => {
    let result = [...laptops];

    if (filters.brand?.length) {
        result = result.filter(l => filters.brand!.includes(l.brand));
    }
    if (filters.ram?.length) {
        result = result.filter(l => filters.ram!.includes(l.ram));
    }
    if (filters.ssd?.length) {
        result = result.filter(l => filters.ssd!.includes(l.ssd));
    }
    if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        result = result.filter(l => l.price >= min && l.price <= max);
    }
    if (filters.query?.trim()) {
        const q = filters.query.toLowerCase();
        result = result.filter(l =>
            l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
        );
    }

    switch (filters.sortBy) {
        case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
        case 'title-asc':
            result.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            result.sort((a, b) => b.title.localeCompare(a.title));
            break;
    }

    return result;
};

const laptopsSlice = createSlice({
    name: 'laptops',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<Filters>) {
            state.filters = action.payload;
            state.filteredLaptops = applyFilters(state.allLaptops, state.filters);
            state.currentPage = 1;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        resetFilters(state) {
            state.filters = {
                brand: [],
                ram: [],
                ssd: [],
                priceRange: [0, 100000],
                sortBy: 'price-asc',
                query: '',
            };
            state.filteredLaptops = applyFilters(state.allLaptops, state.filters);
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLaptops.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchLaptops.fulfilled, (state, action: PayloadAction<Laptop[]>) => {
                state.status = 'succeeded';
                state.allLaptops = action.payload;
                state.filteredLaptops = applyFilters(state.allLaptops, state.filters);
            })
            .addCase(fetchLaptops.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch laptops';
            });
    }
});

export const { setFilters, setCurrentPage, resetFilters } = laptopsSlice.actions;
export default laptopsSlice.reducer;
