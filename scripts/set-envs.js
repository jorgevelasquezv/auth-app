require("dotenv").config();

const { writeFileSync, mkdirSync } = require("fs");

const targetPath = `./src/environments/environment.ts`;

const envFileContent = `
export const environment = {
  production: '${process.env.PRODUCTION}',
  backendBaseUrl: '${process.env.BACKEND_BASE_URL}',
};
`;

mkdirSync("./src/environments", { recursive: true });

writeFileSync(targetPath, envFileContent);
