import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class addCoursesIdToPivoTable1661966114469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('PivoCoursesTags', new TableColumn({
            name: 'coursesId',
            type: 'uuid',
            isNullable: true
        }))
        await queryRunner.createForeignKey('PivoCoursesTags', new TableForeignKey({
            name: 'courses_Tags_courses',
            columnNames: ['coursesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Courses'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('PivoCoursesTags', 'courses_Tags_courses')
        await queryRunner.dropColumn('PivoCoursesTags','coursesId')
    }

}
