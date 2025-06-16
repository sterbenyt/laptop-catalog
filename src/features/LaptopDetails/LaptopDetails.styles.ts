import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 20px;
  flex-wrap: wrap;
`;

export const ImageSection = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const DetailsSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 300px;
`;

export const Title = styled.h1`
  margin: 0;
`;

export const SpecsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin-bottom: 8px;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
`;

export const Price = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

export const AddButton = styled.button`
  padding: 12px 20px;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005fcc;
  }
`;
