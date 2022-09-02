import { Module } from '@nestjs/common';
import { LibsModule } from './libs/libs.module';
import { CoursesModule } from './courses/courses.module';
import { DataSourceModule } from './data-source/data-source.module';

@Module({
  imports: [DataSourceModule ,CoursesModule, LibsModule],
  providers: [],
  controllers: []
})
export class AppModule {}
