import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './util/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  swaggerConfig(app);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
