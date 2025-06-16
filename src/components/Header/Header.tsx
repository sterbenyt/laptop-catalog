import React from 'react';
import {
    HeaderWrapper,
    NavLinks,
    Logo,
    CartIconWrapper,
    CartCountBadge,
    SearchWrapper,
    NavLink,
    LeftSection,
} from './Header.styles';
import SearchBar from '../SearchBar/SearchBar';
import cartIcon from '../../assets/cart.svg';
import { useAppSelector } from '../../app/hooks';

interface HeaderProps {
    onCartOpen?: () => void;
    onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCartOpen, onSearch }) => {
    const cartItemsCount = useAppSelector(state =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    return (
        <HeaderWrapper>
            <LeftSection>
                <Logo>Laptop Catalog</Logo>
                <NavLinks>
                    <NavLink to="/" data-test="nav-catalog">Каталог</NavLink>
                    <NavLink to="/delivery" data-test="nav-delivery">Доставка</NavLink>
                    <NavLink to="/about" data-test="nav-about">Про нас</NavLink>
                </NavLinks>
            </LeftSection>

            <SearchWrapper>
                <SearchBar onSearch={onSearch} />
            </SearchWrapper>

            <CartIconWrapper
                onClick={onCartOpen}
                style={{ cursor: onCartOpen ? 'pointer' : 'default' }}
                data-testid="cart-icon"
            >
                <img src={cartIcon} alt="Cart" style={{ width: 24, height: 24 }} />
                {cartItemsCount > 0 && <CartCountBadge data-testid="cart-count-badge">{cartItemsCount}</CartCountBadge>}
            </CartIconWrapper>
        </HeaderWrapper>
    );
};

export default Header;
