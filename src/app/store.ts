import { configureStore } from '@reduxjs/toolkit';
import laptopsReducer from '../features/laptopsSlice';
import cartReducer from '../features/cartSlice'; // Додай імпорт редюсера кошика

export const store = configureStore({
    reducer: {
        laptops: laptopsReducer,
        cart: cartReducer, // Додай сюди cart
    },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
