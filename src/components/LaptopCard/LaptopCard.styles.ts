import styled from 'styled-components';

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(0,0,0,0.05);
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 12px rgba(0,0,0,0.15);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: contain;
  margin-bottom: 12px;
`;

export const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
  color: #222;
`;

export const Description = styled.p`
    font-size: 14px;
    color: #555;
    flex-grow: 1;
    margin-bottom: 12px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;


export const Price = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 12px;
`;

export const AddToCartButton = styled.button`
  background-color: #2a9d8f;
  color: white;
  border: none;
  padding: 10px 12px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #21867a;
  }
`;
