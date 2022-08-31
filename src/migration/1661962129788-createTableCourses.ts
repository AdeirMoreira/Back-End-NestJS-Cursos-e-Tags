import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createTableCourses1661962129788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'Courses',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name:'name',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text',

                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }))
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await   queryRunner.dropTable('Courses')
    }

}
