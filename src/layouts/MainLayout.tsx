import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { LayoutWrapper, MainContent } from './MainLayout.styles';

type MainLayoutProps = {
    children: React.ReactNode;
    onCartOpen?: () => void;
    onSearch?: (query: string) => void;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, onCartOpen, onSearch }) => {
    return (
        <LayoutWrapper>
            <Header onCartOpen={onCartOpen} onSearch={onSearch} />
            <MainContent>{children}</MainContent>
            <Footer />
        </LayoutWrapper>
    );
};

export default MainLayout;
