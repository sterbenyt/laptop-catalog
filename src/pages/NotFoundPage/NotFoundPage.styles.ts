import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

export const Code = styled.h1`
  font-size: 120px;
  margin: 0;
  color: #e63946;
`;

export const Message = styled.h2`
  font-size: 32px;
  margin: 16px 0 8px;
  color: #264653;
`;

export const Description = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 24px;
`;

export const HomeLink = styled(Link)`
  font-size: 18px;
  color: #2a9d8f;
  text-decoration: none;
  border: 2px solid #2a9d8f;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2a9d8f;
    color: white;
  }
`;
