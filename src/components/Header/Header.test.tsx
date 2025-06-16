import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';
import SearchBar from '../SearchBar/SearchBar';
import * as reduxHooks from '../../app/hooks';
import { MemoryRouter } from 'react-router-dom';

describe('Header component', () => {
    const useSelectorMock = jest.spyOn(reduxHooks, 'useAppSelector');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly (snapshot)', () => {
        useSelectorMock.mockReturnValue(3);
        const wrapper = mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('renders navigation links', () => {
        useSelectorMock.mockReturnValue(0);
        const wrapper = mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(wrapper.text()).toContain('Каталог');
        expect(wrapper.text()).toContain('Доставка');
        expect(wrapper.text()).toContain('Про нас');
    });

    it('renders SearchBar and passes onSearch prop', () => {
        useSelectorMock.mockReturnValue(0);
        const onSearchMock = jest.fn();
        const wrapper = mount(
            <MemoryRouter>
                <Header onSearch={onSearchMock} />
            </MemoryRouter>
        );
        const searchBar = wrapper.find(SearchBar);
        expect(searchBar.exists()).toBe(true);
        expect(searchBar.prop('onSearch')).toBe(onSearchMock);
    });

    it('calls onCartOpen when cart icon is clicked', () => {
        useSelectorMock.mockReturnValue(0);
        const onCartOpenMock = jest.fn();
        const wrapper = mount(
            <MemoryRouter>
                <Header onCartOpen={onCartOpenMock} />
            </MemoryRouter>
        );

        const cartIconWrapper = wrapper.find('[data-testid="cart-icon"]').first();
        expect(cartIconWrapper.exists()).toBe(true);

        cartIconWrapper.simulate('click');
        expect(onCartOpenMock).toHaveBeenCalledTimes(1);
    });

    it('shows CartCountBadge only when cartItemsCount > 0', () => {
        useSelectorMock.mockReturnValue(5);
        const wrapperWithItems = mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        // Перевіряємо, що цифра 5 присутня як рядок
        expect(wrapperWithItems.text()).toContain('5');

        useSelectorMock.mockReturnValue(0);
        const wrapperWithoutItems = mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(wrapperWithoutItems.text()).not.toContain('5');
    });

    // Нові тести для підвищення покриття

    it('does not throw error and does not call onCartOpen if onCartOpen is not provided', () => {
        useSelectorMock.mockReturnValue(2);
        const wrapper = mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const cartIconWrapper = wrapper.find('[data-testid="cart-icon"]').first();
        expect(cartIconWrapper.exists()).toBe(true);

        expect(() => {
            cartIconWrapper.simulate('click');
        }).not.toThrow();
    });



    it('sets cursor style to default if onCartOpen prop is not passed', () => {
        useSelectorMock.mockReturnValue(1);
        const wrapper = mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const cartIconWrapper = wrapper.find('[data-testid="cart-icon"]').first();
        expect(cartIconWrapper.prop('style')?.cursor).toBe('default');
    });

    it('calls onSearch prop when SearchBar triggers search', () => {
        useSelectorMock.mockReturnValue({ cart: { items: [] } });
        const onSearchMock = jest.fn();
        const wrapper = mount(
            <MemoryRouter>
                <Header onSearch={onSearchMock} />
            </MemoryRouter>
        );

        const searchBar = wrapper.find(SearchBar);
        expect(searchBar.exists()).toBe(true);

        const onSearchProp = searchBar.prop('onSearch');
        if (onSearchProp) {
            onSearchProp('test query');
        }
        expect(onSearchMock).toHaveBeenCalledWith('test query');
    });

    it('does not throw if onCartOpen is not provided and cart icon clicked', () => {
        useSelectorMock.mockReturnValue(2);
        const wrapper = mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const cartIcon = wrapper.find('[data-testid="cart-icon"]').first();
        expect(() => cartIcon.simulate('click')).not.toThrow();
    });

    it('does not throw if onSearch is not provided and SearchBar triggers search', () => {
        useSelectorMock.mockReturnValue({ cart: { items: [] } });
        const wrapper = mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const searchBar = wrapper.find(SearchBar);
        expect(() => {
            const onSearchProp = searchBar.prop('onSearch');
            if (onSearchProp) onSearchProp('query');
        }).not.toThrow();
    });

    it('renders correctly without any props', () => {
        useSelectorMock.mockReturnValue(0);
        const wrapper = mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(wrapper.exists()).toBe(true);
    });

    it('correctly calculates cartItemsCount from items array', () => {
        useSelectorMock.mockImplementation(selector =>
            selector({
                laptops: {} as any,  // Якщо хочеш швидко заглушити
                cart: {
                    items: [
                        { id: '1', quantity: 2, title: 'Item 1', price: 100 },
                        { id: '2', quantity: 3, title: 'Item 2', price: 200 },
                    ],
                    isOpen: false,
                },
            })
        );

        const wrapper = mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const badges = wrapper.find('[data-testid="cart-count-badge"]');
        expect(badges.length).toBeGreaterThan(0); // перевірка що є
        const badge = badges.at(0); // беремо перший елемент
        expect(badge.text()).toBe('5'); // 2 + 3 = 5
    });


});
