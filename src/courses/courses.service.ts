import { HttpException, Injectable, NotAcceptableException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    private courses:Course[] = [
        {
            id: '1',
            name: 'NestJS',
            description: 'Curso de NestJS da Udemy',
            tags: ['nestjs', 'nodejs', 'backend']
        },
        {
            id: '2',
            name: 'TypeORM',
            description: 'Curso de TypeORM da Udemy',
            tags: ['nestjs', 'TypeORM', 'backend']
        }
    ]

    findOne(id:string) {
        const course = this.courses.find(course => id === course.id)
        if(!course) {
            throw new NotFoundException(`course id ${id} not found!`)
        }
        return course
    }

    findAll() {
        return this.courses
    }

    create(course:CreateCourseDto){
        this.courses.push(course)
        return course
    }

    update(id:string, course:UpdateCourseDto){
        this.courses.map(c => {
            if(c.id === id) {
                c.name = course.name || c.name
                c.description = course.description || c.description
                c.tags = course.tags || c.tags
                return c
            } 
            return c
        }
        )
        return course
    }

    delete(id:string){
        const newArray = this.courses.filter(course => course.id !== id)
        this.courses = newArray
    }
}
