import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  NODE_ENV: string;
  MONGO_DB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
}

const envsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  MONGO_DB_URI: Joi.string().required(),
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
  mongoDbUri: envVars.MONGO_DB_URI,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpirationTime: envVars.JWT_EXPIRATION_TIME,
};
