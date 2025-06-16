// src/__mocks__/undici.js
module.exports = {
    fetch: () => Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({}),
        text: async () => '',
    }),
};
