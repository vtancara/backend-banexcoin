import { Comision } from '../src/comisiones/entities/comision.entity';
import { Contacto } from '../src/contacto/entities/contacto.entity';
import { Cuenta } from '../src/cuentas/entities/cuenta.entity';
import { Transaccion } from '../src/transacciones/entities/transaccion.entity';
import { Usuario } from '../src/usuarios/entities/usuario.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'vtancara',
  password: 'postgres',
  database: 'banexcoin',
  entities: [Usuario, Cuenta, Comision, Transaccion, Contacto],
  synchronize: false, // Importante: false para producción
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
  factories: [__dirname + '/factories/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
