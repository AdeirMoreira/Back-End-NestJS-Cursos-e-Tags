import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';


type MockRepository <T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>():MockRepository<T> => ({
  findOne: jest.fn()
})

describe('CoursesService', () => {
  let service: CoursesService;
  let courseRepository: MockRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {provide: DataSource, useValue: {}},
        {provide: getRepositoryToken(Course), useValue: createMockRepository()},
        {provide: getRepositoryToken(Tag), useValue: createMockRepository()}
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    courseRepository = module.get<MockRepository>(getRepositoryToken(Course))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne method test', () => {
    describe('search by course id', () => {
      const courseID = 'id'
      test('course found', async () => {
        const expectedCourse = {}
        courseRepository.findOne.mockReturnValue(expectedCourse)
        const result = await service.findOne(courseID)
        expect(result).toStrictEqual(expectedCourse)
      })
      test('course not found', async () => {
        courseRepository.findOne.mockReturnValue(undefined)
        try {
          await service.findOne(courseID)
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException)
          expect(error.message).toEqual(`course id ${courseID} not found!`)
        }
      })
    })
  });
});
