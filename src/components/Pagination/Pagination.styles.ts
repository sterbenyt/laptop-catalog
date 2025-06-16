import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
`;

interface PageButtonProps {
    active?: boolean;
}

export const PageButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'active',
})<PageButtonProps>`
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    background-color: ${({ active }) => (active ? '#2a9d8f' : '#f0f0f0')};
    color: ${({ active }) => (active ? 'white' : '#333')};
    cursor: pointer;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};

    &:hover {
        background-color: ${({ active }) => (active ? '#21867a' : '#2a9d8f')};
        color: white;
    }
`;
