import { Comision } from '../../comisiones/entities/comision.entity';
import { Transaccion } from '../../transacciones/entities/transaccion.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Cuenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero_cuenta: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  saldo: number;

  @Column({ name: 'id_usuario' })
  idUsuario: number;

  @Column({ name: 'id_referido', nullable: true })
  idReferido: number | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.cuentas)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.referidos)
  @JoinColumn({ name: 'id_referido' })
  referido: Usuario;

  @OneToMany(() => Transaccion, (transaccion) => transaccion.cuentaOrigen)
  transaccionesOrigen: Transaccion[];

  @OneToMany(() => Transaccion, (transaccion) => transaccion.cuentaDestino)
  transaccionesDestino: Transaccion[];

  @OneToMany(() => Comision, (comision) => comision.cuenta)
  comisiones: Comision[];
}
