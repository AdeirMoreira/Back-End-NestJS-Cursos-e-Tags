import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { DataSourceModule } from './data-source/data-source.module';



@Module({
  imports: [CoursesModule, DataSourceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
