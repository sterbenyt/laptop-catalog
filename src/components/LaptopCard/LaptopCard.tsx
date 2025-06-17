import React from 'react';
import { Link } from 'react-router-dom';
import {
    CardWrapper,
    Image,
    Title,
    Description,
    Price,
    AddToCartButton,
} from './LaptopCard.styles';

interface LaptopCardProps {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
    onAddToCart: (id: string) => void;
}

const LaptopCard: React.FC<LaptopCardProps> = ({
                                                   id,
                                                   title,
                                                   description,
                                                   price,
                                                   imageUrl,
                                                   onAddToCart,
                                               }) => {
    return (
        <CardWrapper data-test="product-card">
            <Link to={`/laptop/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {imageUrl && <Image src={`${process.env.PUBLIC_URL}${imageUrl}`} alt={title} />}
                <Title>{title}</Title>
                <Description>{description}</Description>
                <Price data-testid="price">{price.toLocaleString('uk-UA')} грн</Price>
            </Link>
            <AddToCartButton onClick={() => onAddToCart(id)} data-test="add-to-cart-button">
                Додати до кошика
            </AddToCartButton>
        </CardWrapper>
    );
};

export default LaptopCard;
