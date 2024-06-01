import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  NODE_ENV: string;
  PORT: string;
  MONGO_DB_URI: string;
  MONGO_DB_NAME: string;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
}

const envsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  MONGO_DB_URI: Joi.string().required(),
  MONGO_DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoDbUri: envVars.MONGO_DB_URI,
  mongoDbName: envVars.MONGO_DB_NAME,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpirationTime: envVars.JWT_EXPIRATION_TIME,
};
