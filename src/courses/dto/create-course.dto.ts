import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class CreateCourseDto {
    @IsNotEmpty({message: 'name is required'})
    @IsString({message: 'name must be a string'})
    readonly name: string

    @IsNotEmpty({ message: 'description is required'})
    @IsString({message: 'description must be a string'})
    readonly description: string

    @IsNotEmpty({ message: 'tags is required'})
    @IsArray({message: 'tags must be an array'})
    @IsString({each: true, message: 'tags must be an array of strings'})
    readonly tags: string[]
}
