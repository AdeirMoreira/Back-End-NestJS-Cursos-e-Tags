import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { LibsModule } from 'src/libs/libs.module';


@Module({
    imports: [TypeOrmModule.forFeature([Course]),LibsModule],
    controllers: [CoursesController],
    providers: [CoursesService],
    exports: [CoursesService]
})
export class CoursesModule {}
