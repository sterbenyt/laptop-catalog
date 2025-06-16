import React from 'react';
import { FooterWrapper, FooterText } from './Footer.styles';

const Footer = () => {
    return (
        <FooterWrapper>
            <FooterText>&copy; {new Date().getFullYear()} Laptop Catalog. Усі права захищено.</FooterText>
        </FooterWrapper>
    );
};

export default Footer;
