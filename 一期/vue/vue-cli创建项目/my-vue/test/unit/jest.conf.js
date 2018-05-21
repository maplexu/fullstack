const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),   //根目录
  moduleFileExtensions: [                       //文件扩展名
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {                           //文件映射
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {                                //转换（例如，js不能直接测试，要先通过i一个babel，编译之后才能测试）
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'      //.vue文件也要转换成适合测试的格式
  },
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e'
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  mapCoverage: true,
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**'
  ]
}
