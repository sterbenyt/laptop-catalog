import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    fetchLaptops,
    setFilters,
    setCurrentPage,
    Filters,
} from '../../features/laptopsSlice';
import { addToCart } from '../../features/cartSlice';
import LaptopList from '../../features/LaptopList/LaptopList';
import FilterSortPanel from '../../components/FilterSortPanel/FilterSortPanel';
import Pagination from '../../components/Pagination/Pagination';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';

const Container = styled.div`
    padding: 20px;
`;

const CatalogPage: React.FC = () => {
    const location = useLocation();
    const history = useHistory();

    const dispatch = useAppDispatch();

    const {
        filteredLaptops,
        status,
        error,
        filters,
        currentPage,
        itemsPerPage,
    } = useAppSelector((state) => state.laptops);

    const getSearchParams = () => new URLSearchParams(location.search);

    useEffect(() => {
        const searchParams = getSearchParams();

        const brand = searchParams.get('brand')?.split(',') || [];
        const ram: number[] =
            searchParams
                .get('ram')
                ?.split(',')
                .map(Number)
                .filter((n: number) => !isNaN(n)) || [];
        const ssd = searchParams.get('ssd')?.split(',') || [];
        const query = searchParams.get('query') || '';
        const sortBy = searchParams.get('sort') as Filters['sortBy'] | undefined;

        const minParam = searchParams.get('min');
        const maxParam = searchParams.get('max');

        const min =
            minParam !== null && !isNaN(Number(minParam)) ? Number(minParam) : 0;
        const max =
            maxParam !== null && !isNaN(Number(maxParam)) ? Number(maxParam) : 100000;

        const priceRange: [number, number] = [min, max];

        const pageParam = searchParams.get('page');
        const page = pageParam !== null && !isNaN(Number(pageParam)) ? Number(pageParam) : 1;

        dispatch(
            setFilters({
                brand,
                ram,
                ssd,
                priceRange,
                sortBy,
                query,
            })
        );

        dispatch(setCurrentPage(page));

        dispatch(fetchLaptops());
    }, [dispatch, location.search]);

    useEffect(() => {
        const params: Record<string, string> = {};

        if (filters.query) params.query = filters.query;
        if (filters.brand?.length) params.brand = filters.brand.join(',');
        if (filters.ram?.length) params.ram = filters.ram.join(',');
        if (filters.ssd?.length) params.ssd = filters.ssd.join(',');

        if (filters.priceRange) {
            if (filters.priceRange[0] !== 0) params.min = filters.priceRange[0].toString();
            if (filters.priceRange[1] !== 100000)
                params.max = filters.priceRange[1].toString();
        }

        if (filters.sortBy) params.sort = filters.sortBy;

        if (currentPage && currentPage !== 1) {
            params.page = currentPage.toString();
        }

        const searchString = new URLSearchParams(params).toString();

        history.push({
            pathname: location.pathname,
            search: searchString,
            hash: '',
            state: undefined,
        });
    }, [filters, currentPage, history, location.pathname]);

    const handleFilterChange = (newFilters: Filters) => {
        if (
            newFilters.ram &&
            newFilters.ram.length > 0 &&
            typeof newFilters.ram[0] === 'string'
        ) {
            newFilters = {
                ...newFilters,
                ram: newFilters.ram.map((r) => Number(r)),
            };
        }

        dispatch(setFilters(newFilters));
        dispatch(setCurrentPage(1));
    };

    const handleResetFilters = () => {
        dispatch(
            setFilters({
                brand: [],
                ram: [],
                ssd: [],
                priceRange: [0, 100000],
                sortBy: undefined,
                query: '',
            })
        );
        dispatch(setCurrentPage(1));
    };

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const handleAddToCart = (id: string) => {
        const laptopToAdd = filteredLaptops.find((laptop) => laptop.id === id);
        if (laptopToAdd) {
            dispatch(addToCart(laptopToAdd));
        } else {
            console.warn(`Laptop with id=${id} not found for adding to cart`);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const laptopsToShow = filteredLaptops.slice(startIndex, endIndex);

    return (
        <Container>
            <FilterSortPanel
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
            />

            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && laptopsToShow.length === 0 && (
                <p>No laptops found.</p>
            )}
            {status === 'succeeded' && laptopsToShow.length > 0 && (
                <LaptopList laptops={laptopsToShow} onAddToCart={handleAddToCart} />
            )}

            {status === 'succeeded' &&
                filteredLaptops.length > itemsPerPage && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filteredLaptops.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                        data-testid="pagination"
                    />
                )}
        </Container>
    );
};

export default CatalogPage;
