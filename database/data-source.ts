import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { config } from 'dotenv';
import databaseConfig from './config';

// Cargar variables de entorno
config();

// Obtener la configuración de base de datos
const dbConfig = databaseConfig();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: dbConfig.type as 'postgres' | 'mysql' | 'sqlite' | 'mariadb',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: dbConfig.entities,
  synchronize: dbConfig.synchronize,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
  factories: [__dirname + '/factories/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  logging: process.env.NODE_ENV !== 'production',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
