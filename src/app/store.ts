// store.ts
import { configureStore } from '@reduxjs/toolkit';
import laptopsReducer from '../features/laptopsSlice';
import cartReducer from '../features/cartSlice'; // Додай імпорт редюсера кошика

export const store = configureStore({
    reducer: {
        laptops: laptopsReducer,
        cart: cartReducer, // Додай сюди cart
    },
});

// Тип для типізації useDispatch
export type AppDispatch = typeof store.dispatch;

// Тип для типізації useSelector
export type RootState = ReturnType<typeof store.getState>;
