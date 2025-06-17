import reportWebVitals from '../reportWebVitals';

jest.mock('web-vitals', () => ({
    getCLS: jest.fn(),
    getFID: jest.fn(),
    getFCP: jest.fn(),
    getLCP: jest.fn(),
    getTTFB: jest.fn(),
}));

describe('reportWebVitals', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('does not call web-vitals functions if onPerfEntry is not a function', async () => {
        await reportWebVitals(undefined);
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

        expect(getCLS).not.toHaveBeenCalled();
        expect(getFID).not.toHaveBeenCalled();
        expect(getFCP).not.toHaveBeenCalled();
        expect(getLCP).not.toHaveBeenCalled();
        expect(getTTFB).not.toHaveBeenCalled();
    });

    it('calls all web-vitals functions with onPerfEntry if provided', async () => {
        const mockHandler = jest.fn();

        await reportWebVitals(mockHandler);

        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

        expect(getCLS).toHaveBeenCalledWith(mockHandler);
        expect(getFID).toHaveBeenCalledWith(mockHandler);
        expect(getFCP).toHaveBeenCalledWith(mockHandler);
        expect(getLCP).toHaveBeenCalledWith(mockHandler);
        expect(getTTFB).toHaveBeenCalledWith(mockHandler);
    });
});
