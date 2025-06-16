import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import '@testing-library/jest-dom';

describe('NotFoundPage', () => {
    test('renders 404 code and error message', () => {
        render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );

        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText('Сторінку не знайдено')).toBeInTheDocument();
        expect(
            screen.getByText('Вибачте, але запитувана сторінка не існує.')
        ).toBeInTheDocument();
    });

    test('renders link to home page', () => {
        render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );

        const link = screen.getByRole('link', { name: /Повернутися на головну/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/');
    });
});
