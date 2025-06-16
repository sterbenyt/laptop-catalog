import React from 'react';
import { render, screen } from '@testing-library/react';
import DeliveryPage from '../pages/DeliveryPage/DeliveryPage';
import '@testing-library/jest-dom';

describe('DeliveryPage', () => {
    beforeEach(() => {
        render(<DeliveryPage />);
    });

    it('renders the main title', () => {
        // Check if the main title "Доставка та замовлення" is present in the document
        expect(screen.getByText('Доставка та замовлення')).toBeInTheDocument();
    });

    it('displays informational text about delivery', () => {
        // Verify that the informational text about delivery methods is displayed
        expect(
            screen.getByText(/Ми пропонуємо зручні способи доставки по всій країні/i)
        ).toBeInTheDocument();
    });

    it('has a subtitle "Варіанти доставки:"', () => {
        // Check if the subtitle "Варіанти доставки:" is present
        expect(screen.getByText('Варіанти доставки:')).toBeInTheDocument();
    });

    it('shows the list of delivery options', () => {
        // Verify presence of each delivery option in the list
        expect(screen.getByText(/Кур'єрська доставка по місту — 1-2 дні/i)).toBeInTheDocument();
        expect(screen.getByText(/Нова пошта — доставка в найближче відділення протягом 2-4 днів/i)).toBeInTheDocument();
        expect(screen.getByText(/Самовивіз з магазину — безкоштовно/i)).toBeInTheDocument();
    });

    it('has a subtitle "Оплата замовлення:"', () => {
        // Check for the subtitle "Оплата замовлення:"
        expect(screen.getByText('Оплата замовлення:')).toBeInTheDocument();
    });

    it('shows the list of payment options', () => {
        // Verify the payment options texts are present in the document
        expect(screen.getByText(/Онлайн-оплата карткою/i)).toBeInTheDocument();
        expect(screen.getByText(/Оплата при отриманні готівкою або карткою/i)).toBeInTheDocument();
    });

    it('displays support contact text', () => {
        // Check if the support contact message is rendered
        expect(
            screen.getByText(/Якщо у вас виникли питання, будь ласка, звертайтесь до служби підтримки/i)
        ).toBeInTheDocument();
    });
});
