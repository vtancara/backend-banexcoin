import { DataSource } from 'typeorm';
import { Comision } from 'src/comisiones/entities/comision.entity';

export const seedComision = async (dataSource: DataSource) => {
  const contactoRepository = dataSource.getRepository(Comision);

  const comisiones = [
    {
      idTransaccion: 1,
      monto: 10,
      fechaHora: new Date('2020-10-01T00:00:00Z'),
      idCuentaBeneficiaria: 2,
    },
    {
      idTransaccion: 2,
      monto: 20,
      fechaHora: new Date('2021-10-01T00:00:00Z'),
      idCuentaBeneficiaria: 3,
    },
    {
      idTransaccion: 3,
      monto: 30,
      fechaHora: new Date('2022-10-01T00:00:00Z'),
      idCuentaBeneficiaria: 4,
    },
    {
      idTransaccion: 4,
      monto: 40,
      fechaHora: new Date('2020-10-01T00:00:00Z'),
      idCuentaBeneficiaria: 1,
    },
    {
      idTransaccion: 5,
      monto: 50,
      fechaHora: new Date('2021-10-01T00:00:00Z'),
      idCuentaBeneficiaria: 3,
    },
    {
      idTransaccion: 6,
      monto: 60,
      fechaHora: new Date('2022-10-01T00:00:00Z'),
      idCuentaBeneficiaria: 4,
    },
  ];

  for (const comision of comisiones) {
    const exists = await contactoRepository.findOneBy({
      idTransaccion: comision.idTransaccion,
      fechaHora: comision.fechaHora,
    });
    if (!exists) {
      const newTransaccion = contactoRepository.create(comision);
      await contactoRepository.save(newTransaccion);
      console.log(`✅ Comision para  ${comision.idCuentaBeneficiaria} creado`);
    } else {
      console.log(
        `✅ Comision para usuario ${comision.idCuentaBeneficiaria} ya existe`,
      );
    }
  }
};
