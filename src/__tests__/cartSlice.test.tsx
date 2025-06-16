import cartReducer, {
    addToCart,
    removeFromCart,
    clearCart,
    toggleCart,
    closeCart,
} from '../features/cartSlice';

const initialState = {
    items: [],
    isOpen: false,
};

describe('cartSlice', () => {
    it('should return initial state', () => {
        expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should add a new item to cart', () => {
        const newState = cartReducer(initialState, addToCart({
            id: '1',
            title: 'Laptop A',
            price: 10000,
            imageUrl: '/laptop-a.jpg',
        }));

        expect(newState.items).toHaveLength(1);
        expect(newState.items[0]).toEqual({
            id: '1',
            title: 'Laptop A',
            price: 10000,
            imageUrl: '/laptop-a.jpg',
            quantity: 1,
        });
    });

    it('should increase quantity if item already exists', () => {
        const stateWithItem = {
            ...initialState,
            items: [
                { id: '1', title: 'Laptop A', price: 10000, imageUrl: '/laptop-a.jpg', quantity: 1 },
            ],
        };

        const newState = cartReducer(stateWithItem, addToCart({
            id: '1',
            title: 'Laptop A',
            price: 10000,
            imageUrl: '/laptop-a.jpg',
        }));

        expect(newState.items).toHaveLength(1);
        expect(newState.items[0].quantity).toBe(2);
    });

    it('should remove item from cart', () => {
        const stateWithItem = {
            ...initialState,
            items: [
                { id: '1', title: 'Laptop A', price: 10000, quantity: 1 },
                { id: '2', title: 'Laptop B', price: 12000, quantity: 1 },
            ],
        };

        const newState = cartReducer(stateWithItem, removeFromCart('1'));

        expect(newState.items).toHaveLength(1);
        expect(newState.items[0].id).toBe('2');
    });

    it('should clear the cart', () => {
        const stateWithItems = {
            ...initialState,
            items: [
                { id: '1', title: 'Laptop A', price: 10000, quantity: 2 },
                { id: '2', title: 'Laptop B', price: 12000, quantity: 1 },
            ],
        };

        const newState = cartReducer(stateWithItems, clearCart());

        expect(newState.items).toEqual([]);
    });

    it('should toggle cart visibility', () => {
        const toggledOnce = cartReducer(initialState, toggleCart());
        expect(toggledOnce.isOpen).toBe(true);

        const toggledTwice = cartReducer(toggledOnce, toggleCart());
        expect(toggledTwice.isOpen).toBe(false);
    });

    it('should close the cart', () => {
        const openedState = { ...initialState, isOpen: true };
        const newState = cartReducer(openedState, closeCart());

        expect(newState.isOpen).toBe(false);
    });
});
