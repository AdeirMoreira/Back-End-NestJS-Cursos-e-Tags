import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { LibsModule } from 'src/libs/libs.module';
import { DataSourceModule } from 'src/data-source/data-source.module';
import { repositoriesProviders } from './repositories/repositories.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Module({
    imports: [
        // DataSourceModule, 
        TypeOrmModule.forFeature([Course,Tag]),
        LibsModule
    ],
    controllers: [CoursesController],
    providers: [
        // ...repositoriesProviders ,
        CoursesService
    ],
    exports: [CoursesService]
})
export class CoursesModule {}
