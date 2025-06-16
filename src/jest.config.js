module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    transformIgnorePatterns: [
        '/node_modules/(?!axios)/' // Трансформуємо axios, щоб Jest міг його розпарсити
    ],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: ['<rootDir>/src/jest.setup.js'],
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/*.styles.ts'],
    coverageDirectory: 'coverage',
};
