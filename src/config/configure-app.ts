import { INestApplication, INestApplicationContext } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as dotenv from 'dotenv-flow';

const throwEnvNullError = () => {
  throw Error('NODE_ENV variable not set properly.');
};

/**
 * Configures Nest Application (security, pipes, views, etc)
 * @param app Nest Application
 * @param options Application settings
 */

/**
 * Application settings
 */
export interface ApplicationOptions {
  enableApiDocs?: boolean;
}

export function configureApp(app: INestApplication, options: ApplicationOptions = {}, module?: INestApplicationContext): void {
  app.enableCors();

  if (module) {
    // According to: https://github.com/nestjs/nest/issues/528#issuecomment-382330137
    // This will cause class-validator to use the nestJS module resolution,
    // the fallback option is to spare ourselfs from importing all the class-validator modules to nestJS
    useContainer(module, { fallbackOnErrors: true });
  }

  if (options.enableApiDocs) {
    enableApiDocs(app);
  }
}

function enableApiDocs(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .addApiKey({ name: 'x-api-key', type: 'apiKey', in: 'header' }, 'x-api-key')
    .addBearerAuth()
    .setTitle('Sampling APIs')
    .setDescription('All the available endpoints for the Sampling service.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const baseUrl = '/api/docs';

  SwaggerModule.setup(baseUrl, app, document, {
    jsonDocumentUrl: `${baseUrl}.json`,
    yamlDocumentUrl: `${baseUrl}.yaml`,
  });
}

/**
 * Sets up the proper environement file depending on the NODE_ENV passed as a param
 * @param env Application environment
 */
export function setEnvironmentVariables() {
  // Since we are using dotenv-flow, the loading logic of the .env is automatically handled
  // see https://www.npmjs.com/package/dotenv-flow for more info
  try {
    dotenv.config();
  } catch (error) {}
}

/**
 * Returns the proper entities path depending on the NODE_ENV as a param
 * @param env Application environment
 */
export function getEntitiesPathFromEnv(env?: string) {
  if (!env) throwEnvNullError();

  return env === 'test' ? ['src/**/*.entity.ts'] : ['dist/src/**/*.entity.js'];
}

/**
 * Returns the proper entities path depending on the NODE_ENV as a param
 * @param env Application environment
 */
export function getMigrationPathFromEnv(env?: string) {
  if (!env) throwEnvNullError();

  return env === 'test' ? ['db/migrations/*.ts'] : ['dist/db/migrations/*.js'];
}
