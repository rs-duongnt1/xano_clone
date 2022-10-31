import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app/app.module';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    // methods: ['GET', 'DELETE', '''PATCH'],
  });
  const port = process.env.PORT || 3333;
  await app.listen(port);
}
bootstrap();
