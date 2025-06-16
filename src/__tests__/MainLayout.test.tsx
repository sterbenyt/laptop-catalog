import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainLayout from '../layouts/MainLayout';
import '@testing-library/jest-dom';

// Мокаємо Header і Footer, якщо вони складні або містять логіку
jest.mock('../components/Header/Header', () => (props: any) => (
    <div data-testid="mock-header">
        Header
        <button onClick={() => props.onCartOpen?.()}>Open Cart</button>
        <input
            placeholder="search"
            onChange={(e) => props.onSearch?.(e.target.value)}
        />
    </div>
));
jest.mock('../components/Footer/Footer', () => () => (
    <div data-testid="mock-footer">Footer</div>
));

describe('MainLayout', () => {
    it('renders children correctly', () => {
        render(
            <MainLayout>
                <div data-testid="child">Hello</div>
            </MainLayout>
        );

        expect(screen.getByTestId('child')).toHaveTextContent('Hello');
    });

    it('renders Header and Footer', () => {
        render(<MainLayout>Test</MainLayout>);

        expect(screen.getByTestId('mock-header')).toBeInTheDocument();
        expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });

    it('calls onCartOpen when triggered in Header', () => {
        const handleCartOpen = jest.fn();
        render(
            <MainLayout onCartOpen={handleCartOpen}>
                <div>Test</div>
            </MainLayout>
        );

        fireEvent.click(screen.getByText('Open Cart'));
        expect(handleCartOpen).toHaveBeenCalled();
    });

    it('calls onSearch when typing in search input', () => {
        const handleSearch = jest.fn();
        render(
            <MainLayout onSearch={handleSearch}>
                <div>Test</div>
            </MainLayout>
        );

        fireEvent.change(screen.getByPlaceholderText('search'), {
            target: { value: 'laptop' },
        });
        expect(handleSearch).toHaveBeenCalledWith('laptop');
    });
});
