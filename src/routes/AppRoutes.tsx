import React from 'react';

import CatalogPage from '../pages/CatalogPage/CatalogPage';
import LaptopPage from '../pages/LaptopPage/LaptopPage';
import DeliveryPage from '../pages/DeliveryPage/DeliveryPage';
import AboutPage from '../pages/AboutPage/AboutPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const appRoutes = [
    {
        path: '/',
        index: true,
        element: <CatalogPage />,
    },
    {
        path: '/catalog',
        element: <CatalogPage />,
    },
    {
        path: '/laptop/:id',
        element: <LaptopPage />,
    },
    {
        path: '/delivery',
        element: <DeliveryPage />,
    },
    {
        path: '/about',
        element: <AboutPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];

export default appRoutes;

