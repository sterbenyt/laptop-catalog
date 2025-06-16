import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LaptopPage from '../pages/LaptopPage/LaptopPage';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useParams } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mocking Redux and React Router hooks
jest.mock('../app/hooks', () => ({
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}));

describe('LaptopPage', () => {
    const mockLaptop = {
        id: '1',
        title: 'Test Laptop',
        description: 'A great laptop for testing',
        price: 12345,
        brand: 'BrandX',
        ram: 16,
        ssd: '512GB',
        cpu: 'Intel i7',
        gpu: 'Nvidia RTX',
        imageUrl: 'main.jpg',
        screenType: 'IPS',
        screenResolution: '1920x1080',
        gallery: ['img1.jpg', 'img2.jpg'],
    };

    let mockDispatch: jest.Mock;

    beforeEach(() => {
        jest.useFakeTimers();
        mockDispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useParams as jest.Mock).mockReturnValue({ id: '1' });
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.resetAllMocks();
    });

    test('renders "Ноутбук не знайдено" if the laptop is not found', () => {
        // This simulates the case when laptop is not available in the store
        (useAppSelector as jest.Mock).mockReturnValue(undefined);
        (useParams as jest.Mock).mockReturnValue({ id: 'no-id' });

        render(<LaptopPage />);

        // If the selector returns undefined, the "Laptop not found" message should appear
        expect(screen.getByText(/Ноутбук не знайдено/i)).toBeInTheDocument();
    });

    test('renders laptop details and price', () => {
        (useAppSelector as jest.Mock).mockReturnValue(mockLaptop);

        render(<LaptopPage />);

        expect(screen.getByRole('heading', { name: /Test Laptop/i })).toBeInTheDocument();

        // This condition checks whether the price 12345 грн is present, ignoring white spaces
        expect(
            screen.getByText((content) => {
                const normalized = content.replace(/\s/g, '').toLowerCase();
                return normalized.includes('12345грн'); // if true, test passes
            })
        ).toBeInTheDocument();
    });

    test('tab switching between specs and description', () => {
        (useAppSelector as jest.Mock).mockReturnValue(mockLaptop);
        render(<LaptopPage />);

        // By default, specs should be shown
        expect(screen.getByText(/Процесор:/i)).toBeInTheDocument();

        // Description should not be visible initially
        expect(screen.queryByText(mockLaptop.description)).not.toBeInTheDocument();

        // Clicking on the "Description" tab
        fireEvent.click(screen.getByText('Опис'));

        // Now, description should be shown and specs should be hidden
        expect(screen.getByText(mockLaptop.description)).toBeInTheDocument();
        expect(screen.queryByText(/Процесор:/i)).not.toBeInTheDocument();
    });

    test('slider changes main image every 4 seconds', () => {
        (useAppSelector as jest.Mock).mockReturnValue(mockLaptop);
        render(<LaptopPage />);

        const mainImage = screen.getByAltText(mockLaptop.title) as HTMLImageElement;

        // Initially main.jpg should be shown
        expect(mainImage.src).toContain('main.jpg');

        // After 4 seconds, it should switch to img1.jpg
        act(() => {
            jest.advanceTimersByTime(4000);
        });
        expect(mainImage.src).toContain('img1.jpg');

        // After another 4 seconds, it should switch to img2.jpg
        act(() => {
            jest.advanceTimersByTime(4000);
        });
        expect(mainImage.src).toContain('img2.jpg');

        // Then back to the beginning (looping)
        act(() => {
            jest.advanceTimersByTime(4000);
        });
        expect(mainImage.src).toContain('main.jpg');
    });

    test('navigation buttons cycle through images', () => {
        (useAppSelector as jest.Mock).mockReturnValue(mockLaptop);
        render(<LaptopPage />);

        const mainImage = screen.getByAltText(mockLaptop.title) as HTMLImageElement;
        const buttons = screen.getAllByRole('button');

        // First image should be main.jpg
        expect(mainImage.src).toContain('main.jpg');

        // Click "next" — should go to img1.jpg
        fireEvent.click(buttons[1]);
        expect(mainImage.src).toContain('img1.jpg');

        // Click "next" — should go to img2.jpg
        fireEvent.click(buttons[1]);
        expect(mainImage.src).toContain('img2.jpg');

        // Click "next" — should loop to main.jpg
        fireEvent.click(buttons[1]);
        expect(mainImage.src).toContain('main.jpg');

        // Click "previous" — should go to img2.jpg
        fireEvent.click(buttons[0]);
        expect(mainImage.src).toContain('img2.jpg');
    });

    test('clicking "Add to Cart" dispatches correct payload', () => {
        (useAppSelector as jest.Mock).mockReturnValue(mockLaptop);
        render(<LaptopPage />);

        const addButton = screen.getByText(/Додати до кошика/i);
        fireEvent.click(addButton);

        // Check if dispatch was called once
        expect(mockDispatch).toHaveBeenCalledTimes(1);

        // Check if dispatch was called with the correct payload
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'cart/addToCart',
            payload: mockLaptop,
        });
    });
});
