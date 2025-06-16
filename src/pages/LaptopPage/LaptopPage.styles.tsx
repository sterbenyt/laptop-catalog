import styled, { css } from 'styled-components';

export const Container = styled.div`
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

export const TopSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin-bottom: 40px;
`;

export const ImageSliderWrapper = styled.div`
    flex: 1 1 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;  /* для абсолютного позиціонування кнопок */
    max-width: 500px;
`;

export const MainImage = styled.img`
    width: 100%;
    border-radius: 8px;
    object-fit: contain;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

export const Thumbnails = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

// Важливо: виключаємо isActive з пропсів, що йдуть у DOM
export const Thumbnail = styled.img.withConfig({
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>`
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border 0.2s ease-in-out;

    ${({ isActive }) =>
            isActive &&
            css`
                border: 2px solid #2a9d8f;
            `}
`;

export const Navigation = styled.div`
    position: absolute;
    top: 50%;
    width: 100%;
    pointer-events: none; /* щоб кліки не блокували зображення */

    /* Ліва кнопка всередині фото, зміщена на 10px від лівого краю */
    & > button:first-child {
        position: absolute;
        left: 10px;
        transform: translateY(-50%);
        pointer-events: auto;
    }

    /* Права кнопка всередині фото, зміщена на 10px від правого краю */
    & > button:last-child {
        position: absolute;
        right: 10px;
        transform: translateY(-50%);
        pointer-events: auto;
    }
`;

export const NavButton = styled.button`
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid #2a9d8f;
    color: #2a9d8f;
    font-size: 24px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: #2a9d8f;
        color: white;
    }
`;

export const InfoBlock = styled.div`
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 30px;
    margin-top: 50px;

    h1 {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 10px;
    }
`;

export const Price = styled.div`
    font-size: 32px;
    font-weight: 700;
    color: #2a9d8f;
`;

export const AddButton = styled.button`
    background-color: #2a9d8f;
    color: white;
    border: none;
    padding: 14px 22px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.5s ease;

    &:hover {
        background-color: #21867a;
    }
`;

export const Tabs = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

// Виключаємо active з пропсів, що передаються у DOM
export const TabButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
    padding: 10px 18px;
    font-size: 16px;
    background-color: ${({ active }) => (active ? '#2a9d8f' : '#f0f0f0')};
    color: ${({ active }) => (active ? 'white' : '#333')};
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: ${({ active }) => (active ? '#21867a' : '#e0e0e0')};
    }
`;

export const Specs = styled.div`
    background-color: #fafafa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 40px;

    ul {
        list-style: none;
        padding: 0;

        li {
            margin-bottom: 10px;
            font-size: 16px;

            b {
                width: 160px;
                display: inline-block;
            }
        }
    }
`;

export const Description = styled.div`
    background-color: #fafafa;
    padding: 20px;
    border-radius: 8px;

    p {
        font-size: 16px;
        line-height: 1.6;
    }
`;
