import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';
import { FooterWrapper, FooterText } from './Footer.styles';

describe('Footer component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.exists()).toBe(true);
    });

    it('contains FooterWrapper and FooterText styled components', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find(FooterWrapper).length).toBe(1);
        expect(wrapper.find(FooterText).length).toBe(1);
    });

    it('displays the current year and correct text', () => {
        const wrapper = shallow(<Footer />);
        const currentYear = new Date().getFullYear();
        expect(wrapper.find(FooterText).text()).toContain(`© ${currentYear} Laptop Catalog. Усі права захищено.`);
    });
});
