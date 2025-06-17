import React from 'react';
import {
    Overlay,
    ModalWindow,
    Title,
    CartItem as CartItemStyled,
    Img,
    Info,
    ItemTitle,
    ItemPrice,
    RemoveButton,
    Footer,
    CheckoutButton,
    CloseButton,
    EmptyMessage,
} from './CartModal.styles';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeFromCart, clearCart } from '../../features/cartSlice';

type CartModalProps = {
    onClose: () => void;
};

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();

    const items = useAppSelector(state => state.cart.items);

    const handleRemove = (id: string) => dispatch(removeFromCart(id));
    const handleCheckout = () => {
        alert('Оформлення замовлення...');
        dispatch(clearCart());
        onClose();
    };

    return (
        <Overlay onClick={onClose} data-testid="overlay" >
            <ModalWindow onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>Кошик</Title>
                {items.length === 0 ? (
                    <EmptyMessage data-test="cart-empty-message">Кошик порожній</EmptyMessage>
                ) : (
                    <>
                        {items.map(item => (
                            <CartItemStyled key={item.id}>
                                <Img src={item.imageUrl || '/no-image.png'} alt={item.title} />
                                <Info>
                                    <ItemTitle>{item.title}</ItemTitle>
                                    <ItemPrice>{item.price} грн × {item.quantity}</ItemPrice>
                                </Info>
                                <RemoveButton onClick={() => handleRemove(item.id)} data-test="remove-from-cart-button">×</RemoveButton>
                            </CartItemStyled>
                        ))}
                        <Footer>
                            <div>Всього: {items.reduce((sum, i) => sum + i.price * i.quantity, 0)} грн</div>
                            <CheckoutButton onClick={handleCheckout} data-test="checkout-button">Оформити</CheckoutButton>
                        </Footer>
                    </>
                )}
            </ModalWindow>
        </Overlay>
    );
};

export default CartModal;
