import { fetchLaptops } from '../api/laptopsApi'; // заміни шлях на актуальний
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

describe('fetchLaptops', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('fetches laptops with no parameters', async () => {
        const mockData = [{ id: '1', title: 'Test', description: 'desc', price: 1000, processor: 'i5', graphics: 'Intel', ssd: '512GB' }];
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const result = await fetchLaptops();

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:4000/laptops?');
        expect(result).toEqual(mockData);
    });

    it('fetches laptops with search and sort', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([]));

        await fetchLaptops({
            search: 'asus',
            sortBy: 'price',
            sortOrder: 'desc'
        });

        expect(fetchMock).toHaveBeenCalledWith(
            expect.stringContaining('q=asus&_sort=price&_order=desc')
        );
    });

    it('fetches laptops with pagination', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([]));

        await fetchLaptops({
            page: 2,
            limit: 10
        });

        // start = (page - 1) * limit = 10
        expect(fetchMock).toHaveBeenCalledWith(
            expect.stringContaining('_start=10&_limit=10')
        );
    });

    it('applies filters to query', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([]));

        await fetchLaptops({
            filters: {
                processor: 'i7',
                graphics: 'RTX 3050',
                ssd: '1TB'
            }
        });

        const call = fetchMock.mock.calls[0][0] as string;

        expect(call).toContain('processor=i7');
        expect(call).toContain('graphics=RTX+3050');
        expect(call).toContain('ssd=1TB');
    });

    it('throws error on failed fetch', async () => {
        fetchMock.mockResponseOnce('Internal Server Error', { status: 500 });

        await expect(fetchLaptops()).rejects.toThrow('Failed to fetch laptops');
    });
});
