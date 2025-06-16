import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import LaptopCard from './LaptopCard';

describe('LaptopCard component', () => {
    const defaultProps = {
        id: 'abc123',
        title: 'Test Laptop',
        description: 'Test description',
        price: 15000,
        imageUrl: 'http://example.com/image.jpg',
        onAddToCart: jest.fn(),
    };

    it('does not render image if imageUrl is not provided', () => {
        const props = { ...defaultProps, imageUrl: undefined };
        const wrapper = mount(
            <MemoryRouter>
                <LaptopCard {...props} />
            </MemoryRouter>
        );
        expect(wrapper.find('img').exists()).toBe(false);
    });

    it('calls onAddToCart with id when button is clicked', () => {
        const onAddToCartMock = jest.fn();
        const wrapper = mount(
            <MemoryRouter>
                <LaptopCard {...defaultProps} onAddToCart={onAddToCartMock} />
            </MemoryRouter>
        );

        wrapper.find('button').simulate('click');
        expect(onAddToCartMock).toHaveBeenCalledWith(defaultProps.id);
    });
});
