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

  @ManyToOne(() => Usuario, (usuario) => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.contactos)
  @JoinColumn({ name: 'id_contacto' })
  contacto: Usuario;
}
