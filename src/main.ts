import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['shortly-space-orange-strong']
    })
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  const config = new DocumentBuilder()
    .setTitle('NestJS RESTful API')
    .setDescription('NestJS RESTful API description')
    .setVersion('1.0')
    .addTag('NestJS RESTful API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
