import { Inject, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
    constructor(
        // @Inject('COURSES_REPOSITORY')
        // private readonly courseRepository: Repository<Course>,
        // @Inject('TAGS_REPOSITORY')
        // private readonly tagRepository: Repository<Tag>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ){}

    async findOne(id:string) {
        const course = await this.courseRepository.findOne({where: {id},relations: {tags: true}})
        if(!course) {
            throw new NotFoundException(`course id ${id} not found!`)
        }
        return course
    }

    async findAll() {
        return this.courseRepository.find({relations:{tags: true}})
    }

    async create(courseDto:CreateCourseDto){
        const tags = await Promise.all(
            courseDto.tags.map((name:string) => this.preloadTagByName(name))
        )
        const course = this.courseRepository.create({...courseDto, tags})
        return this.courseRepository.save(course)
    }

    async update(id:string, updateCourseDto:UpdateCourseDto){
        const tags = updateCourseDto.tags && (await Promise.all(
            updateCourseDto.tags.map((name:string) => this.preloadTagByName(name)))
        )
        const course = await this.courseRepository.preload({
            id,...updateCourseDto, tags
        })
        if(!course) {
            throw new NotFoundException(`course id ${id} not found!`)
        }
        return this.courseRepository.save(course)
    }

    async delete(id:string){
        const course = await this.courseRepository.findOneBy({id})
        if(!course) {
            throw new NotFoundException(`course id ${id} not found!`)
        }
        return this.courseRepository.remove(course)
    }

    private async preloadTagByName(name:string):Promise<Tag> {
        const tag = await this.tagRepository.findOneBy({name})
        if(tag) {
            return tag
        }
        return this.tagRepository.create({name})
    }
}
