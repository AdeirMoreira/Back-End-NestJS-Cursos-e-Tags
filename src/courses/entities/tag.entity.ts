import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";
import { v4 as uuid } from "uuid";


@Entity({name:'Tags'})
export class Tag {

    @BeforeInsert()
    generatedId() { if(!this.id) this.id = uuid() }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length:50, unique: true})
    name: string

    @ManyToMany(()=> Course, (courses)=> courses.tags)
    course: Course[]

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date
}
