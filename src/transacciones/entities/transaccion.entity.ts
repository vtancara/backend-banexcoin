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
  cuentaOrigen: number;

  @Column({ name: 'cuenta_destino' })
  cuentaDestino: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'date' })
  fecha: Date;

  @ManyToOne(() => Cuenta, (cuenta) => cuenta.transaccionesOrigen)
  @JoinColumn({ name: 'cuenta_origen' })
  CuentaOrigen: Cuenta;

  @ManyToOne(() => Cuenta, (cuenta) => cuenta.transaccionesDestino)
  @JoinColumn({ name: 'cuenta_destino' })
  CuentaDestino: Cuenta;

  @OneToMany(() => Comision, (comision) => comision.transaccion)
  comisiones: Comision[];
}
