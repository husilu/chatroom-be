import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { TransformInterceptor } from './core/interceptor/transform.interceptor'
import { HttpExceptionFilter } from './core/filter/http-exception.filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  const swaggerOptions = new DocumentBuilder()
  .setTitle('sest-starter api document')
  .setDescription('nest starter project api document')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);
  await app.listen(3080);
}
bootstrap();
