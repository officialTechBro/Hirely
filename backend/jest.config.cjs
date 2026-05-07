/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: 'node',
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {},
    testMatch: ['**/tests/**/*.test.js'],
    forceExit: true,
    detectOpenHandles: true,
}
