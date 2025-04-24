import { Cuenta } from '../../cuentas/entities/cuenta.entity';
import { Transaccion } from '../../transacciones/entities/transaccion.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Comision {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ name: 'id_transaccion' })
  idTransaccion: number;

  @Column({ name: 'id_cuenta_beneficiaria' })
  idCuentaBeneficiaria: number;

  @ManyToOne(() => Transaccion, (transaccion) => transaccion.comisiones)
  @JoinColumn({ name: 'id_transaccion' })
  transaccion: Transaccion;

  @ManyToOne(() => Cuenta, (cuenta) => cuenta.comisiones)
  @JoinColumn({ name: 'id_cuenta_beneficiaria' })
  cuenta: Cuenta;
}
