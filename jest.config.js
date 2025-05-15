module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // ✅ required for JSX/DOM tests
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
