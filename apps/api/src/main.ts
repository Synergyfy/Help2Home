import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Help2Home API')
    .setDescription('The Help2Home API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  let port = Number(process.env.PORT) || 3000;

  const startServer = async (p: number) => {
    try {
      await app.listen(p);
      console.log(`\x1b[32m[NestApplication] Server successfully started on port ${p}\x1b[0m`);
    } catch (err: any) {
      if (err.code === 'ADDRINUSE' || err.code === 'EADDRINUSE') {
        console.warn(`\x1b[33m[NestApplication] Port ${p} is already in use, automatically trying port ${p + 1}...\x1b[0m`);
        await startServer(p + 1);
      } else {
        throw err;
      }
    }
  };

  await startServer(port);
}
bootstrap();

