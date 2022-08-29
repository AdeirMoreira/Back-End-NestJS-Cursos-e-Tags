import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';


@Controller('courses')
export class CoursesController {
    constructor(private readonly courseService:CoursesService){}
    
    @Get('search')
    findOneByQuery(@Query('s') key:string){
        return this.courseService.findOne(key)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll (@Res() res) {
        return res.status(HttpStatus.OK).send(await this.courseService.findAll())
    }

    

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.courseService.findOne(id)
    }

    @Post()
    create(@Body() course:CreateCourseDto){
        return this.courseService.create(course)
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() course:UpdateCourseDto){
        return this.courseService.update(id, course)
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.courseService.delete(id)
    }
    
}
