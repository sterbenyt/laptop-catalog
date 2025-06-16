import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LaptopDetails from './LaptopDetails';
import '@testing-library/jest-dom';


describe('LaptopDetails', () => {
    const mockProps = {
        id: '123',
        title: 'Laptop XYZ',
        description: 'This is a powerful laptop.',
        price: 25000,
        specs: {
            CPU: 'Intel i7',
            RAM: '16GB',
            Storage: '512GB SSD',
        },
        imageUrls: ['image1.jpg', 'image2.jpg'],
        onAddToCart: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders title, description, price, specs and image', () => {
        render(<LaptopDetails {...mockProps} />);

        // Title
        expect(screen.getByText(mockProps.title)).toBeInTheDocument();

        // Description
        expect(screen.getByText(mockProps.description)).toBeInTheDocument();

        // Price
        expect(screen.getByText(`Ціна: ${mockProps.price} грн`)).toBeInTheDocument();

        // Specs list
        Object.entries(mockProps.specs).forEach(([key, value]) => {
            expect(screen.getByText(new RegExp(`${key}:`, 'i'))).toBeInTheDocument();
            expect(screen.getByText(value)).toBeInTheDocument();
        });

        // Image with correct src and alt
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', mockProps.imageUrls[0]);
        expect(image).toHaveAttribute('alt', mockProps.title);
    });

    it('calls onAddToCart with id when Add button is clicked', () => {
        render(<LaptopDetails {...mockProps} />);

        const button = screen.getByText('Додати до кошика');
        fireEvent.click(button);

        expect(mockProps.onAddToCart).toHaveBeenCalledTimes(1);
        expect(mockProps.onAddToCart).toHaveBeenCalledWith(mockProps.id);
    });
});
