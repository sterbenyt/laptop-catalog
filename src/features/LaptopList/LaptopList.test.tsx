import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; // ⬅️ Додано
import LaptopList, { Laptop } from './LaptopList';

const mockOnAddToCart = jest.fn();

const mockLaptops: Laptop[] = [
    {
        id: '1',
        title: 'Laptop A',
        description: 'Powerful laptop',
        price: 10000,
        imageUrl: '/laptop-a.jpg',
    },
    {
        id: '2',
        title: 'Laptop B',
        description: 'Lightweight and fast',
        price: 12000,
        imageUrl: '/laptop-b.jpg',
    },
];

describe('LaptopList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders "Ноутбуки не знайдено." when list is empty', () => {
        render(
            <MemoryRouter>
                <LaptopList laptops={[]} onAddToCart={mockOnAddToCart} />
            </MemoryRouter>
        );
        expect(screen.getByText('Ноутбуки не знайдено.')).toBeInTheDocument();
    });

    it('renders list of laptops when provided', () => {
        render(
            <MemoryRouter>
                <LaptopList laptops={mockLaptops} onAddToCart={mockOnAddToCart} />
            </MemoryRouter>
        );

        expect(screen.getByText('Laptop A')).toBeInTheDocument();
        expect(screen.getByText('Laptop B')).toBeInTheDocument();

        expect(screen.getByText('Powerful laptop')).toBeInTheDocument();
        expect(screen.getByText('Lightweight and fast')).toBeInTheDocument();

        const prices = screen.getAllByTestId('price');
        expect(prices[0]).toHaveTextContent(/10\s*000\s*грн/);
        expect(prices[1]).toHaveTextContent(/12\s*000\s*грн/);
    });


    it('calls onAddToCart when "Додати до кошика" is clicked', () => {
        render(
            <MemoryRouter>
                <LaptopList laptops={mockLaptops} onAddToCart={mockOnAddToCart} />
            </MemoryRouter>
        );

        const addButtons = screen.getAllByText('Додати до кошика');
        expect(addButtons).toHaveLength(2);

        fireEvent.click(addButtons[0]);
        expect(mockOnAddToCart).toHaveBeenCalledWith('1');

        fireEvent.click(addButtons[1]);
        expect(mockOnAddToCart).toHaveBeenCalledWith('2');
    });
});
