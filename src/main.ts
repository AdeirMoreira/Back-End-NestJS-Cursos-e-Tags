import "reflect-metadata";
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { migrationDataSource } from "./config/typeorm";
// import migrationDataSource from "./config/typeorm";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Mks-Case-BackEnd')
    .setDescription('Uma API para cadastro de filmes')
    .setVersion('1.0')
    .addTag('filmes')
    .build();
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();

const main =  async () =>  {
  const pg = migrationDataSource
  pg.initialize()
}

main()

