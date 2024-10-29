import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { AppConfigType } from './configs/config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('March-2024-Doc')
    .setDescription('some description')
    .setVersion('1.0')
    .addBearerAuth({
      in: 'header',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('api.docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 5,
      persistAuthorization: true,
    },
  });
  const configService = app.get(ConfigService);
  const appConfigs = configService.get<AppConfigType>('app');
  // console.log(appConfigs);
  await app.listen(appConfigs.port, () => {
    console.log(
      `Server is running on http://${appConfigs.host}:${appConfigs.port}`,
    );
    console.log(
      `Swagger is running on http://${appConfigs.host}:${appConfigs.port}/docs`,
    );
  });
}
void bootstrap();
