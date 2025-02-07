import { DataSource, type DataSourceOptions } from 'typeorm';
import { type SeederOptions } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '../.env' });

const option: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [
    __dirname + '/src/**/*.entity.{ts,js}',
    __dirname + '/src/modules/**/**/entities/*.entity{.ts,.js}',
    __dirname + '/src/modules/**/*.view-entity{.ts,.js}',
  ],
  migrations: ['src/migrations/*{.ts,.js}'],
  migrationsRun: false,
  logging: true,
};

export const dataSource = new DataSource(option);
