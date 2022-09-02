import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpStatus,
  INestApplication,
  NotAcceptableException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { CoursesModule } from '../../src/courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Tag } from '../../src/courses/entities/tag.entity';
import { Course } from '../../src/courses/entities/course.entity';
import { CreateCourseDto } from '../../src/courses/dto/create-course.dto';
import { UpdateCourseDto } from '../../src/courses/dto/update-course.dto';

config();

describe('Courses:  /courses', () => {
  const course: CreateCourseDto = {
    name: 'test e2e',
    description: 'description test e2e',
    tags: [],
  };
  const courseupdated: UpdateCourseDto = {
    name: 'test e2e updated',
    description: 'description test e2e updated',
    tags: ['TypeORM', 'PostgresSQL'],
  };

  let courseID: string;
  let missigId = 'e9581531-b58b-45e7-a2c2-470972560679';

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
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
        }),
        CoursesModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('test create method', () => {
    it('create POST /courses', async () => {
      return request(app.getHttpServer())
        .post('/courses')
        .send(course)
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          expect(body).toHaveProperty('name');
          expect(body.name).toBeTruthy();
          expect(body).toHaveProperty('id');
          expect(body.id).toBeTruthy();
          expect(body).toHaveProperty('description');
          expect(body.description).toBeTruthy();
          expect(body).toHaveProperty('created_at');
          expect(body.created_at).toBeTruthy();
          body.tags.forEach((tag) => {
            expect(tag).toHaveProperty('id');
            expect(body.id).toBeTruthy();
            expect(tag).toHaveProperty('name');
            expect(body.name).toBeTruthy();
            expect(tag).toHaveProperty('created_at');
            expect(body.created_at).toBeTruthy();
          });
          courseID = body.id;
        });
    });
  });

  describe('test update method', () => {
    it('update PATCH /:id', () => {
      return request(app.getHttpServer())
        .patch(`/courses/${courseID}`)
        .send(courseupdated)
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          expect(body).toHaveProperty('name');
          expect(body.name).toBeTruthy();
          expect(body).toHaveProperty('id');
          expect(body.id).toBeTruthy();
          expect(body).toHaveProperty('description');
          expect(body.description).toBeTruthy();
          expect(body).toHaveProperty('created_at');
          expect(body.created_at).toBeTruthy();
          body.tags.forEach((tag) => {
            expect(tag).toHaveProperty('id');
            expect(body.id).toBeTruthy();
            expect(tag).toHaveProperty('name');
            expect(body.name).toBeTruthy();
            expect(tag).toHaveProperty('created_at');
            expect(body.created_at).toBeTruthy();
          });
        });
    });
    it('update on id not found PATCH /:id', () => {
      return request(app.getHttpServer())
        .patch(`/courses/${missigId}`)
        .send(courseupdated)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('test findAll method', () => {
    it('findAll GET /', () => {
      return request(app.getHttpServer())
        .get('/courses')
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const [course] = body;
          expect(course).toHaveProperty('name');
          expect(course.name).toBeTruthy();
          expect(course).toHaveProperty('id');
          expect(course.id).toBeTruthy();
          expect(course).toHaveProperty('description');
          expect(course.description).toBeTruthy();
          expect(course).toHaveProperty('created_at');
          expect(course.created_at).toBeTruthy();
          course.tags.forEach((tag) => {
            expect(tag).toHaveProperty('id');
            expect(course.id).toBeTruthy();
            expect(tag).toHaveProperty('name');
            expect(course.name).toBeTruthy();
            expect(tag).toHaveProperty('created_at');
            expect(course.created_at).toBeTruthy();
          });
        });
    });
  });
  describe('test delete method', () => {
    it('delete DELETE /', () => {
      return request(app.getHttpServer())
        .delete(`/courses/${courseID}`)
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          expect(body).toHaveProperty('name');
          expect(body.name).toBeTruthy();
          expect(body).toHaveProperty('description');
          expect(body.description).toBeTruthy();
          expect(body).toHaveProperty('created_at');
          expect(body.created_at).toBeTruthy();
        });
    });
    it('delete on id not found DELETE /:id', () => {
      return request(app.getHttpServer())
        .delete(`/courses/${missigId}`)
        .send(courseupdated)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
