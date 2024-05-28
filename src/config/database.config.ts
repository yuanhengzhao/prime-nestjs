import { ConfigService, registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { getEntitiesPathFromEnv, getMigrationPathFromEnv, setEnvironmentVariables } from 'src/config/configure-app';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSourceOptions } from 'typeorm';

setEnvironmentVariables();
const configService = new ConfigService();

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('DB_URL'),
  namingStrategy: new SnakeNamingStrategy(),
  entities: getEntitiesPathFromEnv(process.env.NODE_ENV),
  migrations: getMigrationPathFromEnv(process.env.NODE_ENV),
  logging: process.env.DB_LOGGING === 'true',
};

export const seedDatabaseConfig: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('DB_URL'),
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/**/*.entity.ts'],
  migrations: ['db/migrations/*.ts'],
  logging: process.env.DB_LOGGING === 'true',
};

export const schema = {
  DB_URL: Joi.string().required(),
};

export const config = registerAs('database', () => ({
  url: process.env.DB_URL,
}));

export default () => ({
  db_url: process.env.DB_URL,
  port: parseInt(process.env.PORT as string, 10),
  app: {
    enableApiDocs: true,
  },
  databaseConfig,
});
