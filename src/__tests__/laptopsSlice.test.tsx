import reducer, {
    setFilters,
    setCurrentPage,
    resetFilters,
    fetchLaptops,
} from '../features/laptopsSlice';
import { Laptop } from '../features/laptopsSlice';
import { AnyAction } from 'redux';

const mockLaptops: Laptop[] = [
    {
        id: '1',
        title: 'Laptop A',
        description: 'Fast laptop',
        price: 15000,
        brand: 'Dell',
        ram: 16,
        ssd: '512GB',
        cpu: 'i7',
        gpu: 'RTX 3050',
        imageUrl: '',
        screenType: 'IPS',
        screenResolution: '1920x1080',
    },
    {
        id: '2',
        title: 'Laptop B',
        description: 'Budget option',
        price: 7000,
        brand: 'HP',
        ram: 8,
        ssd: '256GB',
        cpu: 'i5',
        gpu: 'Intel UHD',
        imageUrl: '',
        screenType: 'TN',
        screenResolution: '1366x768',
    },
    {
        id: '3',
        title: 'Laptop C',
        description: 'Gaming laptop',
        price: 25000,
        brand: 'Dell',
        ram: 32,
        ssd: '1TB',
        cpu: 'i9',
        gpu: 'RTX 3080',
        imageUrl: '',
        screenType: 'IPS',
        screenResolution: '3840x2160',
    },
];

const initialState = {
    allLaptops: [],
    filteredLaptops: [],
    filters: {
        brand: [],
        ram: [],
        ssd: [],
        priceRange: [0, 100000] as [number, number],
        sortBy: undefined,
        query: '',
    },
    currentPage: 1,
    itemsPerPage: 10,
    status: 'idle' as const,
    error: null as string | null,
};

describe('laptopsSlice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should set filters and apply brand filter', () => {
        const stateWithLaptops = { ...initialState, allLaptops: mockLaptops };

        const newState = reducer(
            stateWithLaptops,
            setFilters({
                brand: ['Dell'],
                ram: [],
                ssd: [],
                priceRange: [0, 30000],
                sortBy: undefined,
                query: '',
            })
        );

        expect(newState.filters.brand).toEqual(['Dell']);
        expect(newState.filteredLaptops).toHaveLength(2);
        expect(newState.filteredLaptops.every(l => l.brand === 'Dell')).toBe(true);
        expect(newState.currentPage).toBe(1);
    });

    it('should filter by RAM', () => {
        const stateWithLaptops = { ...initialState, allLaptops: mockLaptops };
        const newState = reducer(
            stateWithLaptops,
            setFilters({
                brand: [],
                ram: [16, 32],
                ssd: [],
                priceRange: [0, 30000],
                sortBy: undefined,
                query: '',
            })
        );

        expect(newState.filteredLaptops).toHaveLength(2);
        expect(newState.filteredLaptops.every(l => [16, 32].includes(l.ram))).toBe(true);
    });

    it('should filter by SSD', () => {
        const stateWithLaptops = { ...initialState, allLaptops: mockLaptops };
        const newState = reducer(
            stateWithLaptops,
            setFilters({
                brand: [],
                ram: [],
                ssd: ['256GB', '1TB'],
                priceRange: [0, 30000],
                sortBy: undefined,
                query: '',
            })
        );

        expect(newState.filteredLaptops).toHaveLength(2);
        expect(newState.filteredLaptops.every(l => ['256GB', '1TB'].includes(l.ssd))).toBe(true);
    });

    it('should filter by price range', () => {
        const stateWithLaptops = { ...initialState, allLaptops: mockLaptops };
        const newState = reducer(
            stateWithLaptops,
            setFilters({
                brand: [],
                ram: [],
                ssd: [],
                priceRange: [10000, 20000],
                sortBy: undefined,
                query: '',
            })
        );

        expect(newState.filteredLaptops).toHaveLength(1);
        expect(newState.filteredLaptops[0].price).toBe(15000);
    });

    it('should filter by query (case insensitive)', () => {
        const stateWithLaptops = { ...initialState, allLaptops: mockLaptops };
        const newState = reducer(
            stateWithLaptops,
            setFilters({
                brand: [],
                ram: [],
                ssd: [],
                priceRange: [0, 30000],
                sortBy: undefined,
                query: 'gaming',
            })
        );

        expect(newState.filteredLaptops).toHaveLength(1);
        expect(newState.filteredLaptops[0].title).toBe('Laptop C');
    });

    it('should sort by price ascending', () => {
        const stateWithLaptops = { ...initialState, allLaptops: mockLaptops };
        const newState = reducer(
            stateWithLaptops,
            setFilters({
                brand: [],
                ram: [],
                ssd: [],
                priceRange: [0, 30000],
                sortBy: 'price-asc',
                query: '',
            })
        );

        expect(newState.filteredLaptops.map(l => l.price)).toEqual([7000, 15000, 25000]);
    });

    it('should sort by price descending', () => {
        const stateWithLaptops = { ...initialState, allLaptops: mockLaptops };
        const newState = reducer(
            stateWithLaptops,
            setFilters({
                brand: [],
                ram: [],
                ssd: [],
                priceRange: [0, 30000],
                sortBy: 'price-desc',
                query: '',
            })
        );

        expect(newState.filteredLaptops.map(l => l.price)).toEqual([25000, 15000, 7000]);
    });

    it('should set current page', () => {
        const newState = reducer(initialState, setCurrentPage(3));
        expect(newState.currentPage).toBe(3);
    });

});