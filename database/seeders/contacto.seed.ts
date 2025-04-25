import { DataSource } from 'typeorm';
import { Contacto } from 'src/contactos/entities/contacto.entity';

export const seedContacto = async (dataSource: DataSource) => {
  const contactoRepository = dataSource.getRepository(Contacto);

  const contactos = [
    {
      idUsuario: 1,
      idContacto: 2,
      idCuenta: 2,
      fecha: '2020-10-01',
    },
    {
      idUsuario: 1,
      idContacto: 3,
      idCuenta: 3,
      fecha: '2021-10-01',
    },
    {
      idUsuario: 1,
      idContacto: 4,
      idCuenta: 4,
      fecha: '2022-10-01',
    },
    {
      idUsuario: 2,
      idContacto: 1,
      idCuenta: 1,
      fecha: '2020-10-01',
    },
    {
      idUsuario: 2,
      idContacto: 3,
      idCuenta: 3,
      fecha: '2021-10-01',
    },
    {
      idUsuario: 4,
      idContacto: 4,
      idCuenta: 4,
      fecha: '2022-10-01',
    },
  ];

  for (const contacto of contactos) {
    const exists = await contactoRepository.findOneBy({
      idUsuario: contacto.idUsuario,
      idContacto: contacto.idContacto,
    });
    if (!exists) {
      const newContacto = contactoRepository.create(contacto);
      await contactoRepository.save(newContacto);
      console.log(
        `✅ Contacto ${contacto.idContacto} para usuario ${contacto.idUsuario} creado`,
      );
    } else {
      console.log(
        `✅ Contacto ${contacto.idContacto} para usuario ${contacto.idUsuario} ya existe`,
      );
    }
  }
};
