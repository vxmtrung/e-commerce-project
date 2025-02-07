import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';

declare const module: any;

async function bootstrap() {
  // Initialize Transactional Context for typeorm
  initializeTransactionalContext();

  // Get Running Port
  const port = process.env.NESTJS_APP_LOCAL_PORT;

  // Init Application
  const app = await NestFactory.create(AppModule);

  // Setup Cors
  app.enableCors();

  // Setup Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Application')
    .setDescription('Application API Description')
    .setVersion('1.0')
    .addBearerAuth()
    .addBasicAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, documentFactory);

  // Open Port
  await app.listen(port).then(() => {
    console.log(`Server started at http://localhost:${port}`);
  });

  // Webpack Reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
