import React from 'react';
import appRoutes from '../routes/AppRoutes';

import CatalogPage from '../pages/CatalogPage/CatalogPage';
import LaptopPage from '../pages/LaptopPage/LaptopPage';
import DeliveryPage from '../pages/DeliveryPage/DeliveryPage';
import AboutPage from '../pages/AboutPage/AboutPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

describe('appRoutes configuration', () => {
    test('should include all expected routes', () => {
        const paths = appRoutes.map(route => route.path);
        expect(paths).toContain('/');
        expect(paths).toContain('/catalog');
        expect(paths).toContain('/laptop/:id');
        expect(paths).toContain('/delivery');
        expect(paths).toContain('/about');
        expect(paths).toContain('*');
    });

    test('should render correct elements for each route', () => {
        const routeMap = Object.fromEntries(appRoutes.map(route => [route.path, route.element.type]));

        expect(routeMap['/']).toBe(CatalogPage);
        expect(routeMap['/catalog']).toBe(CatalogPage);
        expect(routeMap['/laptop/:id']).toBe(LaptopPage);
        expect(routeMap['/delivery']).toBe(DeliveryPage);
        expect(routeMap['/about']).toBe(AboutPage);
        expect(routeMap['*']).toBe(NotFoundPage);
    });

    test('should have index route set for "/"', () => {
        const indexRoute = appRoutes.find(route => route.path === '/' && route.index === true);
        expect(indexRoute).toBeDefined();
        expect(indexRoute?.element.type).toBe(CatalogPage);
    });
});
