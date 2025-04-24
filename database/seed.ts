// database/seed.ts
import AppDataSource from './data-source';
import { seedContacto } from './seeders/contacto.seed';
import { seedCuenta } from './seeders/cuenta.seed';
import { seedUsers } from './seeders/usuario.seed';

AppDataSource.initialize()
  .then(async () => {
    console.log('🚀 Base de datos conectada');
    await seedUsers(AppDataSource);
    await seedContacto(AppDataSource);
    await seedCuenta(AppDataSource);
    console.log('🌱 Seed finalizado');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error al ejecutar el seed:', err);
    process.exit(1);
  });
