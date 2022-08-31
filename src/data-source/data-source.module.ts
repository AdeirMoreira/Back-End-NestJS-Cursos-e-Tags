import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Course } from 'src/courses/entities/course.entity';
import { Tag } from 'src/courses/entities/tag.entity';
import { DataSource } from 'typeorm';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.POSTGRES_DB as any,
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Course, Tag],
      synchronize: false,
      retryAttempts: 2,
      retryDelay: 100,
      autoLoadEntities: false,
    }),
  ],
})
export class DataSourceModule {}

export const migrationDataSource = new DataSource({
  type: process.env.POSTGRES_DB as any,
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*entity.js'],
  migrations: ['dist/migration/*.js'],
  synchronize: false,
});

migrationDataSource.initialize()

