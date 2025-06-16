import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalWindow = styled.div`
    background: #ffffff;
    border-radius: 16px;
    width: 600px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    padding: 24px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    overflow: hidden;
    position: relative;
`;

export const Title = styled.h2`
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
`;

export const CartItem = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
`;

export const Img = styled.img`
    width: 80px;
    height: 60px;
    object-fit: cover;
    margin-right: 16px;
    border-radius: 8px;
    border: 1px solid #ddd;
`;

export const Info = styled.div`
    flex-grow: 1;
`;

export const ItemTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 4px;
`;

export const ItemPrice = styled.div`
    font-size: 18px;
    color: #666;
`;

export const RemoveButton = styled.button`
    background: transparent;
    border: none;
    color: #ff4d4f;
    font-size: 30px;
    cursor: pointer;
    padding: 4px;

    &:hover {
        color: #d9363e;
    }
`;

export const Footer = styled.div`
    margin-top: auto;
    padding-top: 16px;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
`;

export const CheckoutButton = styled.button`
    background: #2a9d8f;
    border: none;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background: #21867a;
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 12px;
    right: 16px;
    background: transparent;
    border: none;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: #666;

    &:hover {
        color: #000;
    }
`;

export const EmptyMessage = styled.p`
    text-align: center;
    color: #888;
    margin-top: 40px;
    font-size: 18px;
`;
