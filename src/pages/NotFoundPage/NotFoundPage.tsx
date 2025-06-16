import React from 'react';
import * as S from './NotFoundPage.styles';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <S.Container>
            <S.Code>404</S.Code>
            <S.Message>Сторінку не знайдено</S.Message>
            <S.Description>Вибачте, але запитувана сторінка не існує.</S.Description>
            <S.HomeLink to="/">Повернутися на головну</S.HomeLink>
        </S.Container>
    );
};

export default NotFoundPage;
