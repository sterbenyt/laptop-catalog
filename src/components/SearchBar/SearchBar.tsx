import React, { useState, useEffect } from 'react';
import { SearchInput, SearchContainer } from './SearchBar.styles';

interface SearchBarProps {
    onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (onSearch) {
            onSearch(newQuery);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} data-test="search-input">
            <SearchContainer >
                <SearchInput
                    type="text"
                    placeholder="Пошук ноутбуків..."
                    value={query}
                    onChange={handleChange}
                />
            </SearchContainer>
        </form>
    );
};

export default SearchBar;
