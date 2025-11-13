module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/contexts/**',
    '!src/navigation/**',
    '!src/screens/**',
    '!**/node_modules/**',
    '!<rootDir>/App.tsx',
    '!<rootDir>/babel.config.js',
    '!<rootDir>/jest.config.js',
    '!<rootDir>/jest-setup.js',
  ],
};