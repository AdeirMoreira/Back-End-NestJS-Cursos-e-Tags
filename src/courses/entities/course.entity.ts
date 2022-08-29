import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm"
import { Tag } from "./tag.entity"

@Entity('Udemy-NestJS-Courses')
export class Course {

    @PrimaryColumn()
    id:string

    @Column({length:50, unique: true})
    name: string

    @Column('text')
    description: string

    @JoinTable({name: 'Udemy-NestJS-CourseTagPivoTable'})
    @ManyToMany(() => Tag, (tag) => tag.course, {cascade: true,})
    tags: Tag[]
}