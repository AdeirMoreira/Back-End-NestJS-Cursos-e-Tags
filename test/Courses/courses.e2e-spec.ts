import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CoursesModule } from '../../src/courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Tag } from '../../src/courses/entities/tag.entity';
import { Course } from '../../src/courses/entities/course.entity';
import { CreateCourseDto } from '../../src/courses/dto/create-course.dto';

config()

describe('Courses:  /courses', () => {
  const course:CreateCourseDto = {
    name: "test e2e",
    description: "test e2e nestJS aplication",
    tags: ['NodeJS','NestJS','TypeORM','PostgresSQL']
  }

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoursesModule, TypeOrmModule.forRoot({
        type: process.env.POSTGRES_DB as 'postgres',
        host: process.env.POSTGRES_HOST_TEST,
        port: 5433,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB_TEST,
        entities: [Course, Tag],
        synchronize: true,
        retryAttempts: 2,
        retryDelay: 100,
        autoLoadEntities: true,
      })],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes( new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }))

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('create POST /courses', async () => {
    return request(app.getHttpServer())
      .post('/courses')
      .send(course)
      .expect(HttpStatus.CREATED)
      .then(({body})=> {
        expect(body).toHaveProperty('name')
        expect(body.name).toBeFalsy()
        expect(body).toHaveProperty('id')
        expect(body.id).toBeFalsy()
        expect(body).toHaveProperty('description')
        expect(body.description).toBeTruthy()
        expect(body).toHaveProperty('created_at')
        expect(body.created_at).toBeTruthy()
        body.tags.forEach(tag => {
          expect(tag).toHaveProperty('id')
          expect(body.id).toBeTruthy()
          expect(tag).toHaveProperty('name')
          expect(body.name).toBeTruthy()
          expect(tag).toHaveProperty('created_at')
          expect(body.created_at).toBeTruthy()
        })
      })
  });
});
