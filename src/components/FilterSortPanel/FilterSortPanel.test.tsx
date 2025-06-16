import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterSortPanel, { LaptopFilters } from './FilterSortPanel';

describe('FilterSortPanel', () => {
    const mockOnChange = jest.fn();
    const mockOnReset = jest.fn();

    const defaultFilters: LaptopFilters = {
        brand: [],
        ram: [],
        ssd: [],
        priceRange: [0, 100000],
        sortBy: undefined,
        query: ''
    };

    const setup = () => {
        render(
            <FilterSortPanel
                filters={defaultFilters}
                onChange={mockOnChange}
                onReset={mockOnReset}
            />
        );
    };

    beforeEach(() => {
        mockOnChange.mockClear();
        mockOnReset.mockClear();
    });

    it('renders toggle button and resets filters', () => {
        setup();

        // Відображення кнопки розгортання
        const toggleBtn = screen.getByText(/Показати фільтри/i);
        fireEvent.click(toggleBtn);
        expect(screen.getByText(/Скинути фільтри/i)).toBeInTheDocument();

        // Клік по кнопці скидання
        const resetBtn = screen.getByText(/Скинути фільтри/i);
        fireEvent.click(resetBtn);
        expect(mockOnReset).toHaveBeenCalledTimes(1);
    });

    it('can select brand and triggers onChange', () => {
        setup();

        fireEvent.click(screen.getByText(/Показати фільтри/i));

        const brandCheckbox = screen.getByLabelText('Apple');
        fireEvent.click(brandCheckbox);

        expect(mockOnChange).toHaveBeenCalledWith(
            expect.objectContaining({
                brand: ['Apple']
            })
        );
    });

    it('can change price range', () => {
        setup();

        fireEvent.click(screen.getByText(/Показати фільтри/i));

        const minInput = screen.getByLabelText(/Мін/i);
        const maxInput = screen.getByLabelText(/Макс/i);

        fireEvent.change(minInput, { target: { value: '5000' } });
        fireEvent.change(maxInput, { target: { value: '25000' } });

        expect(mockOnChange).toHaveBeenCalledWith(
            expect.objectContaining({
                priceRange: [5000, 25000]
            })
        );
    });

    it('can change sort option', () => {
        setup();

        fireEvent.click(screen.getByText(/Показати фільтри/i));

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'price-desc' } });

        expect(mockOnChange).toHaveBeenCalledWith(
            expect.objectContaining({
                sortBy: 'price-desc'
            })
        );
    });
});
