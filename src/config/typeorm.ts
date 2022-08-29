import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";
import { Course } from "src/courses/entities/course.entity";
import { Tag } from "src/courses/entities/tag.entity";
import { DataSource } from "typeorm";

config()

// export const typeORMAsyncConfig: TypeOrmModuleAsyncOptions = {
//     useFactory: async ():Promise<TypeOrmModuleOptions> => {
//         return {
//             type: process.env.POSTGRES_DB as any,
//             host: process.env.POSTGRES_HOST,
//             port: +process.env.POSTGRES_PORT,
//             username: process.env.POSTGRES_USER,
//             password: process.env.POSTGRES_PASSWORD,
//             database: process.env.POSTGRES_DB,
//             entities: ['dist/**/*.entity.{js,ts}'],
//             migrations: ['dis/migration/*.{js,ts}'],
//             synchronize: false
//         }
//     }
// }

export const migrationDataSource = new DataSource({
    type: process.env.POSTGRES_DB as any,
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['dist/**/*entity.js'],
    migrations: ['dist/migration/*.js'],
    subscribers: [],
    synchronize: false,
    logging: false
});


