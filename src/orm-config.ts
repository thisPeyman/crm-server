import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'crmlux',
  password: '123',
  database: 'crm',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
};

const dataSource = new DataSource(config as DataSourceOptions);

export default dataSource;
