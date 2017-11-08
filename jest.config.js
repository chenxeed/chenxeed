module.exports = {
  notify: true,
  cache: false,
  modulePaths: [ '<rootDir>/src' ],
  testMatch: [ '<rootDir>/src/**/*.test.js' ],
  mapCoverage: true,
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|cur)$': '<rootDir>/jest_mock/fileMock.js',
    '^.*\\.scss$': '<rootDir>/jest_mock/styleMock.js'
  },
  watchPathIgnorePatterns: [ '<rootDir>/node_modules/', '<rootDir>/.docker/' ],
  coveragePathIgnorePatterns: [ '<rootDir>/node_modules/', '<rootDir>/.docker/' ],
  modulePathIgnorePatterns: [ '<rootDir>/.docker/' ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor'
  }
}
