import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { DataSourceModule } from './data-source/data-source.module';

@Module({
  imports: [
    DataSourceModule,
    CoursesModule
  ],
  providers: [],
  controllers: []
})
export class AppModule {}
