import "dotenv/config";

const env = process.env.NODE_ENV || "development";

const common = {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
};

const development = {
  baseUrl: "http://localhost:3000",
  ...common,
};

const production = {
  baseUrl: "http://localhost:3000",
  ...common,
};

const test = {
  baseUrl: "http://localhost:3000",
  ...common,
};

const config = {
  development,
  production,
  test,
};

module.exports = config[env];
