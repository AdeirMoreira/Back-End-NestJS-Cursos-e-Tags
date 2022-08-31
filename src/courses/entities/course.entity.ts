import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tag.entity"
import { v4 as uuid } from "uuid"


@Entity({name: 'Courses'})
export class Course {

    @BeforeInsert()
    generatedId() { if(!this.id) this.id = uuid() }
    
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({length:50, unique: true})
    name: string

    @Column('text')
    description: string

    @JoinTable({name: 'PivoCoursesTags'})
    @ManyToMany(() => Tag, (tag) => tag.course, {cascade: true,})
    tags: Tag[]

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date
}