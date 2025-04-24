import { DataSource } from 'typeorm';
import { Cuenta } from 'src/cuentas/entities/cuenta.entity';

export const seedCuenta = async (dataSource: DataSource) => {
  const cuentaRepository = dataSource.getRepository(Cuenta);

  const cuentas = [
    {
      numero_cuenta: '102030405060708090',
      fecha: '2023-10-01',
      saldo: 115.5,
      idUsuario: 1,
      idReferido: null,
    },
    {
      numero_cuenta: '100006778899001122',
      fecha: '2024-10-01',
      saldo: 115.5,
      idUsuario: 2,
      idReferido: 2,
    },
    {
      numero_cuenta: '000000432100000000',
      fecha: '2025-10-01',
      saldo: 200.0,
      idUsuario: 3,
      idReferido: null,
    },
    {
      numero_cuenta: '345678901234567890',
      fecha: '2023-10-01',
      saldo: 2189.5,
      idUsuario: 4,
      idReferido: 1,
    },
    {
      numero_cuenta: '890123456789012345',
      fecha: '2023-10-01',
      saldo: 38900.5,
      idUsuario: 4,
      idReferido: null,
    },
    {
      numero_cuenta: '56789012345678901',
      fecha: '2020-10-01',
      saldo: 178578.89,
      idUsuario: 1,
      idReferido: null,
    },
  ];

  for (const cuenta of cuentas) {
    const exists = await cuentaRepository.findOneBy({
      numero_cuenta: cuenta.numero_cuenta,
    });
    if (!exists) {
      const newCuenta = cuentaRepository.create(cuenta);
      await cuentaRepository.save(newCuenta);
      console.log(`✅ Cuenta ${cuenta.numero_cuenta} creado`);
    } else {
      console.log(`ℹ️ Cuenta ${cuenta.numero_cuenta} ya existe`);
    }
  }
};
