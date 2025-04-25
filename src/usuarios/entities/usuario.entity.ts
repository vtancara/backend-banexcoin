import { Contacto } from '../../contactos/entities/contacto.entity';
import { Cuenta } from '../../cuentas/entities/cuenta.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @OneToMany(() => Cuenta, (cuenta) => cuenta.usuario)
  cuentas: Cuenta[];

  @OneToMany(() => Usuario, (usuario) => usuario.referidos)
  referidos: Usuario[];

  @OneToMany(() => Contacto, (contacto) => contacto.usuario)
  contactos: Contacto[];
}
