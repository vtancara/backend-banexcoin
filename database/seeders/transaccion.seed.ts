import { DataSource } from 'typeorm';
import { Transaccion } from 'src/transacciones/entities/transaccion.entity';

export const seedTransaccion = async (dataSource: DataSource) => {
  const contactoRepository = dataSource.getRepository(Transaccion);

  const transacciones = [
    {
      idCuentaOrigen: 1,
      idCuentaDestino: 2,
      monto: 1000,
      fechaHora: new Date('2020-10-01T00:00:00Z'),
    },
    {
      idCuentaOrigen: 1,
      idCuentaDestino: 3,
      monto: 2000,
      fechaHora: new Date('2021-10-01T00:00:00Z'),
    },
    {
      idCuentaOrigen: 1,
      idCuentaDestino: 4,
      monto: 3000,
      fechaHora: new Date('2022-10-01T00:00:00Z'),
    },
    {
      idCuentaOrigen: 2,
      idCuentaDestino: 1,
      monto: 4000,
      fechaHora: new Date('2020-10-01T00:00:00Z'),
    },
    {
      idCuentaOrigen: 2,
      idCuentaDestino: 3,
      monto: 5000,
      fechaHora: new Date('2021-10-01T00:00:00Z'),
    },
    {
      idCuentaOrigen: 4,
      idCuentaDestino: 4,
      monto: 6000,
      fechaHora: new Date('2022-10-01T00:00:00Z'),
    },
  ];

  for (const transaccion of transacciones) {
    const exists = await contactoRepository.findOneBy({
      idCuentaOrigen: transaccion.idCuentaOrigen,
      idCuentaDestino: transaccion.idCuentaDestino,
      fechaHora: transaccion.fechaHora,
    });
    if (!exists) {
      const newTransaccion = contactoRepository.create(transaccion);
      await contactoRepository.save(newTransaccion);
      console.log(
        `✅ Transaccion ${transaccion.idCuentaOrigen} para  ${transaccion.idCuentaDestino} creado`,
      );
    } else {
      console.log(
        `✅ Transaccion ${transaccion.idCuentaOrigen} para usuario ${transaccion.idCuentaDestino} ya existe`,
      );
    }
  }
};
