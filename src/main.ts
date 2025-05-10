import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('JSULIMA API')
    .setDescription('API documentation for JSULIMA backend')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); 
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(process.env.PORT ?? 7000);
}
bootstrap();
