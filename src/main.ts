import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Open API
    const options = new DocumentBuilder()
    .setTitle('NESTJS API CRUD - DESAFIO COOPERSYSTEM ')
    .setDescription('API de usuarios')
    .setVersion('1.0.0')
    .addTag('nestjsapi')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
