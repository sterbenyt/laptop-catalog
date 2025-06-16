// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: string;
    title: string;
    price: number;
    imageUrl?: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}



const initialState: CartState = {
    items: [],
    isOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<{id: string; title: string; price: number; imageUrl?: string}>) {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({...action.payload, quantity: 1});
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart(state) {
            state.items = [];
        },
        toggleCart(state) {
            state.isOpen = !state.isOpen;
        },
        closeCart(state) {
            state.isOpen = false;
        }
    }
});

export const { addToCart, removeFromCart, clearCart, toggleCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
