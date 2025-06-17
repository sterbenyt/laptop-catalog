import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './ErrorBoundary';

const ProblemChild = () => {
    throw new Error('Test error');
};

describe('ErrorBoundary', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });

    it('renders child components without errors', () => {
        render(
            <ErrorBoundary>
                <div>All is good</div>
            </ErrorBoundary>
        );

        expect(screen.getByText('All is good')).toBeInTheDocument();
    });

    it('displays fallback UI when a child component throws an error', () => {
        const renderWithError = () => {
            render(
                <ErrorBoundary>
                    <ProblemChild />
                </ErrorBoundary>
            );
        };

        expect(renderWithError).not.toThrow();

        expect(screen.getByText('Щось пішло не так.')).toBeInTheDocument();

        expect(consoleErrorSpy).toHaveBeenCalled();
    });
});
