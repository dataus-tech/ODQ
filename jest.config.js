module.exports = {
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/tests/**/*.spec.(js|jsx|ts|tsx)"],
  moduleDirectories: ["node_modules"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
