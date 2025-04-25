import { Cuenta } from '../../cuentas/entities/cuenta.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Contacto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ name: 'id_usuario' })
  idUsuario: number;

  @Column({ name: 'id_contacto' })
  idContacto: number;

  @Column({ name: 'id_cuenta' })
  idCuenta: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.contactos)
  @JoinColumn({ name: 'id_contacto' })
  contacto: Usuario;

  @ManyToOne(() => Cuenta, (cuenta) => cuenta.contacto)
  @JoinColumn({ name: 'id_cuenta' })
  cuenta: Cuenta;
}
