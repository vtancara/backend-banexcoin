import { DataSource } from 'typeorm';
import { Usuario } from '../../src/usuarios/entities/usuario.entity';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(Usuario);

  const usersToSeed = [
    {
      nombre: 'Alan Brito',
      correo: 'alan@demo.com',
    },
    {
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
    },
    {
      nombre: 'Ana Gómez',
      correo: 'ana@example.com',
    },
    {
      nombre: 'Yoselin Ticona',
      correo: 'yoselin@example.com',
    },
  ];

  for (const user of usersToSeed) {
    const exists = await userRepository.findOneBy({ correo: user.correo });
    if (!exists) {
      const newUser = userRepository.create({
        ...user,
      });
      await userRepository.save(newUser);
      console.log(`✅ Usuario ${user.correo} creado`);
    } else {
      console.log(`ℹ️ Usuario ${user.correo} ya existe`);
    }
  }
};
