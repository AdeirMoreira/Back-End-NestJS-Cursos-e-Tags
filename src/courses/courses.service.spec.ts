import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

const coursesArray = [
  {
    id: 'b39a959e-3ad8-4ada-8607-5a6401456528',
    name: 'NestJS',
    description: 'Curso de NestJS, NodeJS e TypeORM',
    created_at: '2022-08-31T23:10:22.435Z',
    tags: [
      {
        id: 'cf61bb5f-c6f6-4606-a548-93c2d59c33bf',
        name: 'NestJS',
        created_at: '2022-08-31T22:59:04.421Z',
      },
    ],
  },
];

const coursesDTO:CreateCourseDto = {
  name: 'teste',
  description: 'teste',
  tags: []
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const coursesMockRepository = <T = any>(): MockRepository<T> => ({
  findOneBy: jest.fn().mockReturnValue(coursesArray[0]),
  findOne: jest.fn().mockReturnValue(coursesArray[0]),
  find: jest.fn().mockReturnValue(coursesArray),
  create: jest.fn().mockReturnValue(coursesArray[0]),
  save: jest.fn().mockReturnValue(coursesArray[0]),
  preload: jest.fn().mockReturnValue(coursesArray[0]),
  remove: jest.fn(),
});

describe('CoursesService', () => {
  let service: CoursesService;
  let courseRepository: MockRepository;
  const courseID = 'b39a959e-3ad8-4ada-8607-5a6401456528';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: getRepositoryToken(Course), useValue: coursesMockRepository() },
        { provide: getRepositoryToken(Tag), useValue: coursesMockRepository() },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    courseRepository = module.get<MockRepository>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('test findOne method', () => {
    test('course found', async () => {
      const result = await service.findOne(courseID);
      expect(result).toStrictEqual(coursesArray[0]);
    });
    test('course not found', async () => {
      courseRepository.findOne.mockReturnValueOnce(undefined);
      try {
        await service.findOne(courseID);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`course id ${courseID} not found!`)
        expect.assertions(2)
      }
    });
  })
  describe('test findAll method', () => {
    test('find all', async () => {
      const result = await service.findAll()
      expect(result).toStrictEqual(coursesArray)
    })
  })
  describe('test create method', () => {
    test('create sucess', async () => {
    const Course = {
      ...coursesDTO, created_at: new Date(), id: 'id'
    }
      courseRepository.create.mockReturnValueOnce(Course)
      courseRepository.save.mockReturnValueOnce(Course)
      const result = await service.create(coursesDTO)
      expect(result).toStrictEqual(Course)
      expect(courseRepository.create).toHaveBeenCalledWith(coursesDTO)
      expect(courseRepository.save).toHaveBeenCalledWith(Course)
    })
  })
  describe('test update method', () => {
    test('test course id not found', async () => {
      try {
        courseRepository.preload.mockReturnValueOnce(undefined)
        await service.update(courseID,coursesDTO)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`course id ${courseID} not found!`)
        expect.assertions(2)
      }
    })
    test('update sucess', async () => {
      const Course = { ...coursesDTO, created_at: new Date(), id: 'id' }
      courseRepository.preload.mockReturnValueOnce(Course)
      courseRepository.save.mockReturnValueOnce(Course)
      const result = await service.update(courseID,Course)
      expect(result).toStrictEqual(Course)
      expect(courseRepository.preload).toHaveBeenCalledWith(Course)
      expect(courseRepository.save).toBeCalledWith(Course)
    })
  })
  describe('test delete method', () => {
    test('test course id not found', async () => {
      try {
        courseRepository.findOneBy.mockReturnValueOnce(undefined)
        await service.delete(courseID)
      } catch (error) { 
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`course id ${courseID} not found!`)
        expect.assertions(2)
      }
    })
    test('update sucess', async () => {
      const result = await service.delete(courseID)
      expect(result).toBeUndefined()
      expect(courseRepository.findOneBy).toHaveBeenCalledWith({id:courseID})
      expect(courseRepository.remove).toBeCalled()
    })
  })
});
