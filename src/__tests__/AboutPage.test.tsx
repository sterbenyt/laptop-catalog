import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from '../pages/AboutPage/AboutPage';
import '@testing-library/jest-dom';

describe('AboutPage', () => {
    it('renders without crashing', () => {
        render(<AboutPage />);
        expect(screen.getByText('Про нас')).toBeInTheDocument();
    });

    it('renders both paragraphs of text', () => {
        render(<AboutPage />);

        expect(
            screen.getByText(/Ласкаво просимо до нашого каталогу ноутбуків!/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Ми цінуємо якість, комфорт та зручність покупок/i)
        ).toBeInTheDocument();
    });

    it('matches snapshot', () => {
        const { container } = render(<AboutPage />);
        expect(container).toMatchSnapshot();
    });
});
