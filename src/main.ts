import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Model } from 'objection';
import { AppModule } from './app.module';
import knex from './database/knex';
import { enableSwagger } from './swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  enableSwagger(app);
  Model.knex(knex);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
