import { Module } from '@nestjs/common';
import { DataSourceModule } from './data-source/data-source.module';
import { LibsModule } from './libs/libs.module';
import { CoursesModule } from './courses/courses.module';
@Module({
  imports: [DataSourceModule, CoursesModule,LibsModule],
  providers: [],
  controllers: []
})
export class AppModule {}
