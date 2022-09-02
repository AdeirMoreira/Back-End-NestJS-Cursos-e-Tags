import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { dataSourceProviders } from './data-source.providers';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.POSTGRES_DB as 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [ __dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      retryAttempts: 5,
      retryDelay: 500,
      autoLoadEntities: false
    })
  ],
  providers: [
    // ...dataSourceProviders
  ],
  exports: [
    // ...dataSourceProviders
  ]
})
export class DataSourceModule {}

