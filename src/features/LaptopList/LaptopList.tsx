import React from 'react';
import LaptopCard from '../../components/LaptopCard/LaptopCard';
import { ListWrapper, Message } from './LaptopList.styles';

export interface Laptop {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
    brand?: string;
    cpu?: string;
    ram?: number;
    storage?: number;
    screenSize?: number;
}

interface LaptopListProps {
    laptops: Laptop[];
    onAddToCart: (id: string) => void;
}

export interface LaptopsState {
    allLaptops: Laptop[];
    filteredLaptops: Laptop[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    filters: {
        brand: string[];
        ram: number[];
        ssd: string[];
        priceRange: [number, number];
        sortBy?: string;
        query: string;
    };
    currentPage: number;
    itemsPerPage: number;
}

// додатково export slice.reducer, slice.actions, ...


const LaptopList: React.FC<LaptopListProps> = ({ laptops, onAddToCart }) => {
    if (!laptops.length) {
        return <Message>Ноутбуки не знайдено.</Message>;
    }

    return (
        <ListWrapper data-test="laptop-list">
            {laptops.map((laptop) => (
                <LaptopCard
                    key={laptop.id}
                    id={laptop.id}
                    title={laptop.title}
                    description={laptop.description}
                    price={laptop.price}
                    imageUrl={laptop.imageUrl}
                    onAddToCart={onAddToCart}

                />
            ))}
        </ListWrapper>
    );
};

export default LaptopList;
