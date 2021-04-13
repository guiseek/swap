/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { join } from 'path';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as express from 'express';
import * as helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import { AllExceptionsFilter } from './app/common/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/public', express.static(join(__dirname, '../../public')));
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ limit: '5mb', extended: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  /* SECURITY */
  // app.enable("trust proxy");
  app.use(helmet());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
