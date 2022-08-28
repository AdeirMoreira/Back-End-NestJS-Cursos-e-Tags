import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('Udemy-NestJS-Courses')
export class Course {

    @PrimaryColumn()
    id:string

    @Column({length:50, unique: true})
    name: string

    @Column('text')
    description: string

    @Column({ type: "json", nullable: true})
    tags: string[]
}