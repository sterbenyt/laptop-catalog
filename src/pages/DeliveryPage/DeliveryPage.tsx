import React from 'react';
import * as S from './DeliveryPage.styles';

const DeliveryPage: React.FC = () => {
    return (
        <S.Container>
            <S.Title>Доставка та замовлення</S.Title>
            <S.Text>
                Ми пропонуємо зручні способи доставки по всій країні. Ваше замовлення буде оброблено протягом 1-2 робочих днів.
            </S.Text>
            <S.SubTitle>Варіанти доставки:</S.SubTitle>
            <S.List>
                <li>Кур'єрська доставка по місту — 1-2 дні.</li>
                <li>Нова пошта — доставка в найближче відділення протягом 2-4 днів.</li>
                <li>Самовивіз з магазину — безкоштовно.</li>
            </S.List>
            <S.SubTitle>Оплата замовлення:</S.SubTitle>
            <S.List>
                <li>Онлайн-оплата карткою.</li>
                <li>Оплата при отриманні готівкою або карткою.</li>
            </S.List>
            <S.Text>
                Якщо у вас виникли питання, будь ласка, звертайтесь до служби підтримки.
            </S.Text>
        </S.Container>
    );
};

export default DeliveryPage;
