import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LaptopPage from '../pages/LaptopPage/LaptopPage';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useParams } from 'react-router-dom';
import '@testing-library/jest-dom';

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
        (useAppSelector as jest.Mock).mockReturnValue(undefined);
        (useParams as jest.Mock).mockReturnValue({ id: 'no-id' });

        render(<LaptopPage />);

        expect(screen.getByText(/Ноутбук не знайдено/i)).toBeInTheDocument();
    });

    test('renders laptop details and price', () => {
        (useAppSelector as jest.Mock).mockReturnValue(mockLaptop);

        render(<LaptopPage />);

        expect(screen.getByRole('heading', { name: /Test Laptop/i })).toBeInTheDocument();

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

        expect(screen.getByText(/Процесор:/i)).toBeInTheDocument();

        expect(screen.queryByText(mockLaptop.description)).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Опис'));

        expect(screen.getByText(mockLaptop.description)).toBeInTheDocument();
        expect(screen.queryByText(/Процесор:/i)).not.toBeInTheDocument();
    });

    test('slider changes main image every 4 seconds', () => {
        (useAppSelector as jest.Mock).mockReturnValue(mockLaptop);
        render(<LaptopPage />);

        const mainImage = screen.getByAltText(mockLaptop.title) as HTMLImageElement;

        expect(mainImage.src).toContain('main.jpg');

        act(() => {
            jest.advanceTimersByTime(4000);
        });
        expect(mainImage.src).toContain('img1.jpg');

        act(() => {
            jest.advanceTimersByTime(4000);
        });
        expect(mainImage.src).toContain('img2.jpg');

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

        expect(mainImage.src).toContain('main.jpg');

        fireEvent.click(buttons[1]);
        expect(mainImage.src).toContain('img1.jpg');

        fireEvent.click(buttons[1]);
        expect(mainImage.src).toContain('img2.jpg');

        fireEvent.click(buttons[1]);
        expect(mainImage.src).toContain('main.jpg');

        fireEvent.click(buttons[0]);
        expect(mainImage.src).toContain('img2.jpg');
    });

    test('clicking "Add to Cart" dispatches correct payload', () => {
        (useAppSelector as jest.Mock).mockReturnValue(mockLaptop);
        render(<LaptopPage />);

        const addButton = screen.getByText(/Додати до кошика/i);
        fireEvent.click(addButton);

        expect(mockDispatch).toHaveBeenCalledTimes(1);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'cart/addToCart',
            payload: mockLaptop,
        });
    });
});
