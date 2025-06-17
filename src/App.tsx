import React, { useState } from 'react';
import {
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
        <ErrorBoundary>
            <MainLayoutWrapper
                onCartOpen={toggleCart}
                isCartOpen={isCartOpen}
                toggleCart={toggleCart}
            />
        </ErrorBoundary>
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

    return (
        <MainLayout onCartOpen={onCartOpen} onSearch={handleSearch}>
            {isCartOpen && <CartModal onClose={toggleCart} />}
            <Switch>
                <Route exact path="/">
                    <Redirect to="/catalog" />
                </Route>
                <Route exact path="/catalog" component={CatalogPage} />
                <Route path="/laptop/:id" component={LaptopPage} />
                <Route path="/delivery" component={DeliveryPage} />
                <Route path="/about" component={AboutPage} />
                <Route path="*" component={NotFoundPage} />
            </Switch>
        </MainLayout>
    );
};

export { MainLayoutWrapper };
export default App;
