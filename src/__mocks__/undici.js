module.exports = {
    fetch: () => Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({}),
        text: async () => '',
    }),
};
