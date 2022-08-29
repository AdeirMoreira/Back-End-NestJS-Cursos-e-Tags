import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { LibsModule } from 'src/libs/libs.module';
import { Tag } from './entities/tag.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Course, Tag]),LibsModule],
    controllers: [CoursesController],
    providers: [CoursesService],
    exports: [CoursesService]
})
export class CoursesModule {}
