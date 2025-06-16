import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';  // <-- імпорт для toBeInTheDocument
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error during rendering
const ProblemChild = () => {
    throw new Error('Test error');
};

describe('ErrorBoundary', () => {
    // Mock console.error to avoid cluttering test output
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

        // Check that the child content is rendered normally
        expect(screen.getByText('All is good')).toBeInTheDocument();
    });

    it('displays fallback UI when a child component throws an error', () => {
        // We wrap render in a function to prevent Jest from crashing on the thrown error
        const renderWithError = () => {
            render(
                <ErrorBoundary>
                    <ProblemChild />
                </ErrorBoundary>
            );
        };

        expect(renderWithError).not.toThrow();

        // Verify the fallback UI text is shown
        expect(screen.getByText('Щось пішло не так.')).toBeInTheDocument();

        // Verify console.error was called from componentDidCatch
        expect(consoleErrorSpy).toHaveBeenCalled();
    });
});
