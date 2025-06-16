import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Використовуємо типізований useDispatch для безпечного диспатчу екшенів
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Використовуємо типізований useSelector для отримання стану з коректною типізацією
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
