import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CoreExceptionFilter } from './exceptions/core-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new CoreExceptionFilter());

  await app.listen(3000);
}

bootstrap();
