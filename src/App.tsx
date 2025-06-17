import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useHistory,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import LaptopPage from './pages/LaptopPage/LaptopPage';
import DeliveryPage from './pages/DeliveryPage/DeliveryPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import CartModal from './components/CartModal/CartModal';
import ErrorBoundary from './error-boundary/ErrorBoundary';

const App: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    return (
        <Router>
            <ErrorBoundary>
                <MainLayoutWrapper
                    onCartOpen={toggleCart}
                    isCartOpen={isCartOpen}
                    toggleCart={toggleCart}
                />
            </ErrorBoundary>
        </Router>
    );
};

type MainLayoutWrapperProps = {
    onCartOpen: () => void;
    isCartOpen: boolean;
    toggleCart: () => void;
};

const MainLayoutWrapper: React.FC<MainLayoutWrapperProps> = ({
                                                                 onCartOpen,
                                                                 isCartOpen,
                                                                 toggleCart,
                                                             }) => {
    const history = useHistory();

    const handleSearch = (query: string) => {
        history.push(`/catalog?query=${encodeURIComponent(query)}`);
    };

    const CatalogPageWrapper = () => (
        <div data-testid="catalog-page">
            <CatalogPage />
        </div>
    );

    const LaptopPageWrapper = () => (
        <div data-testid="laptop-page">
            <LaptopPage />
        </div>
    );

    const DeliveryPageWrapper = () => (
        <div data-testid="delivery-page">
            <DeliveryPage />
        </div>
    );

    const AboutPageWrapper = () => (
        <div data-testid="about-page">
            <AboutPage />
        </div>
    );

    const NotFoundPageWrapper = () => (
        <div data-testid="notfound-page">
            <NotFoundPage />
        </div>
    );

    return (
        <MainLayout onCartOpen={onCartOpen} onSearch={handleSearch}>
            {isCartOpen && <CartModal onClose={toggleCart} />}
            <Switch>
                <Route exact path="/">
                    <Redirect to="/catalog" />
                </Route>
                <Route exact path="/catalog" component={CatalogPageWrapper} />
                <Route path="/laptop/:id" component={LaptopPageWrapper} />
                <Route path="/delivery" component={DeliveryPageWrapper} />
                <Route path="/about" component={AboutPageWrapper} />
                <Route path="*" component={NotFoundPageWrapper} />
            </Switch>
        </MainLayout>
    );
};

export { MainLayoutWrapper };
export default App;
