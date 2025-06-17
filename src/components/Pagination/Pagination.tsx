import React from 'react';
import * as S from './Pagination.styles';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <S.PaginationWrapper>
            {pages.map(page => (
                <S.PageButton
                    key={page}
                    active={page === currentPage}
                    onClick={() => onPageChange(page)}
                    data-testid={page === currentPage ? 'activepage' : undefined}
                >
                    {page}
                </S.PageButton>
            ))}
        </S.PaginationWrapper>
    );
};

export default Pagination;
