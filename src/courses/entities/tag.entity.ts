import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity('Udemy-NestJS-Tags')
export class Tag {
    @PrimaryColumn()
    id: string

    @Column({length:50, unique: true})
    name: string

    @ManyToMany(()=> Course, (course)=> course.tags)
    course: Course[]
}
