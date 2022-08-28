import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UuidService } from 'src/libs/uuid.service';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        private readonly uuidService: UuidService
    ){}

    findOne(id:string) {
        const course = this.courseRepository.findOneBy({id})
        if(!course) {
            throw new NotFoundException(`course id ${id} not found!`)
        }
        return course
    }

    async findAll() {
        return this.courseRepository.find()
         
    }

    async create(course:CreateCourseDto){
        const Course:Course = {...course, id: this.uuidService.generate()}
        this.courseRepository.save(Course)
        return course
    }

    update(id:string, course:UpdateCourseDto){
        return this.courseRepository.update(id,course)
    }

    delete(id:string){
        return this.courseRepository.delete(id)
    }
}
