import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class addTagsIdToPivoTable1661968293316 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('PivoCoursesTags', new TableColumn({
            name: 'tagsId',
            type: 'uuid',
            isNullable: true
        }))
        await queryRunner.createForeignKey('PivoCoursesTags', new TableForeignKey({
            name: 'tags_Courses_tags',
            columnNames: ['tagsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Tags'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('PivoCoursesTags', 'tags_Courses_tags'),
        await queryRunner.dropColumn('PivoCoursesTags', 'tagsId')
    }

}
