import React from 'react';
import * as S from './AboutPage.styles';

const AboutPage: React.FC = () => {
    return (
        <S.Container>
            <S.Title>Про нас</S.Title>
            <S.Text>
                Ласкаво просимо до нашого каталогу ноутбуків! Ми пропонуємо широкий вибір сучасних ноутбуків від провідних виробників.
                Наше завдання — допомогти вам знайти найкращий пристрій, який відповідає вашим потребам.
            </S.Text>
            <S.Text>
                Ми цінуємо якість, комфорт та зручність покупок. Якщо у вас є питання, звертайтесь до нашої служби підтримки.
            </S.Text>
        </S.Container>
    );
};

export default AboutPage;
