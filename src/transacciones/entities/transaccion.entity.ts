import { Comision } from '../../comisiones/entities/comision.entity';
import { Cuenta } from '../../cuentas/entities/cuenta.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cuenta_origen' })
  idCuentaOrigen: number;

  @Column({ name: 'cuenta_destino' })
  idCuentaDestino: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'timestamp' })
  fechaHora: Date;

  @ManyToOne(() => Cuenta, (cuenta) => cuenta.transaccionesOrigen)
  @JoinColumn({ name: 'cuenta_origen' })
  cuentaOrigen: Cuenta;

  @ManyToOne(() => Cuenta, (cuenta) => cuenta.transaccionesDestino)
  @JoinColumn({ name: 'cuenta_destino' })
  cuentaDestino: Cuenta;

  @OneToMany(() => Comision, (comision) => comision.transaccion)
  comisiones: Comision[];
}
