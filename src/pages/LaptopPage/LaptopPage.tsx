import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addToCart } from '../../features/cartSlice';
import * as S from './LaptopPage.styles';

interface Laptop {
    id: string;
    title: string;
    description: string;
    price: number;
    brand: string;
    ram: number;
    ssd: string;
    cpu?: string;
    gpu?: string;
    imageUrl?: string;
    screenType?: string;
    screenResolution?: string;
    gallery?: string[];
}

const LaptopPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const laptop = useAppSelector(state =>
        state.laptops.allLaptops.find((item: Laptop) => item.id === id)
    );

    const [activeTab, setActiveTab] = useState<'specs' | 'description'>('specs');
    const [selectedImage, setSelectedImage] = useState<string | undefined>(laptop?.imageUrl);

    const images = [laptop?.imageUrl, ...(laptop?.gallery || [])].filter(Boolean) as string[];

    useEffect(() => {
        if (!images.length) return;
        const interval = setInterval(() => {
            setSelectedImage(prev => {
                const currentIndex = images.indexOf(prev || '');
                const nextIndex = (currentIndex + 1) % images.length;
                return images[nextIndex];
            });
        }, 4000);
        return () => clearInterval(interval);
    }, [images]);

    if (!laptop) return <S.Container>Ноутбук не знайдено</S.Container>;

    const handleAddToCart = () => {
        dispatch(addToCart(laptop));
    };

    return (
        <S.Container>
            <S.TopSection>
                <S.ImageSliderWrapper>
                    <S.MainImage src={selectedImage || ''} alt={laptop.title} />

                    <S.Thumbnails>
                        {images.map((img, index) => (
                            <S.Thumbnail
                                key={index}
                                src={img}
                                alt={`img-${index}`}
                                onClick={() => setSelectedImage(img)}
                                isActive={img === selectedImage}
                            />
                        ))}
                    </S.Thumbnails>

                    <S.Navigation>
                        <S.NavButton onClick={() => {
                            const currentIndex = images.indexOf(selectedImage || '');
                            const prevIndex = (currentIndex - 1 + images.length) % images.length;
                            setSelectedImage(images[prevIndex]);
                        }}>⟨</S.NavButton>

                        <S.NavButton onClick={() => {
                            const currentIndex = images.indexOf(selectedImage || '');
                            const nextIndex = (currentIndex + 1) % images.length;
                            setSelectedImage(images[nextIndex]);
                        }}>⟩</S.NavButton>
                    </S.Navigation>
                </S.ImageSliderWrapper>

                <S.InfoBlock>
                    <h1 data-test="product-title">{laptop.title}</h1>
                    <S.Price>{laptop.price.toLocaleString()} грн</S.Price>
                    <S.AddButton onClick={handleAddToCart}>Додати до кошика</S.AddButton>
                </S.InfoBlock>
            </S.TopSection>

            <S.Tabs>
                <S.TabButton
                    active={activeTab === 'specs'}
                    onClick={() => setActiveTab('specs')}
                >
                    Характеристики
                </S.TabButton>
                <S.TabButton
                    active={activeTab === 'description'}
                    onClick={() => setActiveTab('description')}
                >
                    Опис
                </S.TabButton>
            </S.Tabs>

            {activeTab === 'specs' && (
                <S.Specs>
                    <ul>
                        <li><b>Процесор:</b> {laptop.cpu || 'Немає інформації'}</li>
                        <li><b>Відеокарта:</b> {laptop.gpu || 'Немає інформації'}</li>
                        <li><b>Оперативна памʼять:</b> {laptop.ram} GB</li>
                        <li><b>SSD:</b> {laptop.ssd}</li>
                        <li><b>Розширення екрану:</b> {laptop.screenResolution}</li>
                        <li><b>Тип екрану:</b> {laptop.screenType}</li>
                    </ul>
                </S.Specs>
            )}

            {activeTab === 'description' && (
                <S.Description>
                    <p>{laptop.description}</p>
                </S.Description>
            )}
        </S.Container>
    );
};

export default LaptopPage;
