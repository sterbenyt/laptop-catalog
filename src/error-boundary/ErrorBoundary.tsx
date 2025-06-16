import React from 'react';

type Props = { children: React.ReactNode };

type State = { hasError: boolean };

class ErrorBoundary extends React.Component<Props, State> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h2>Щось пішло не так.</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
