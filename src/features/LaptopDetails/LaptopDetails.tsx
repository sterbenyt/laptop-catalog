import React from 'react';
import * as S from './LaptopDetails.styles';

interface LaptopDetailsProps {
    id: string;
    title: string;
    description: string;
    price: number;
    specs: Record<string, string>; // ключ-значення технічних характеристик
    imageUrls: string[];
    onAddToCart: (id: string) => void;
}

const LaptopDetails: React.FC<LaptopDetailsProps> = ({
                                                         id,
                                                         title,
                                                         description,
                                                         price,
                                                         specs,
                                                         imageUrls,
                                                         onAddToCart,
                                                     }) => {
    return (
        <S.Container>
            <S.ImageSection>
                <img src={imageUrls[0]} alt={title} width="100%" />
            </S.ImageSection>
            <S.DetailsSection>
                <S.Title>{title}</S.Title>
                <S.SpecsList>
                    {Object.entries(specs).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </S.SpecsList>
                <S.Description>{description}</S.Description>
                <S.Price>Ціна: {price} грн</S.Price>
                <S.AddButton onClick={() => onAddToCart(id)}>Додати до кошика</S.AddButton>
            </S.DetailsSection>
        </S.Container>
    );
};

export default LaptopDetails;
