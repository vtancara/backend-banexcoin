import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Comision } from './entities/comision.entity';
import { Transaccion } from 'src/transacciones/entities/transaccion.entity';

@Injectable()
export class ComisionService {
  constructor(
    @InjectRepository(Comision)
    private comisionRepository: Repository<Comision>,
  ) {}

  /**
   * Crea un registro de comisión
   */
  async crearComision(
    entityManager: EntityManager,
    transaccion: Transaccion,
    monto: number,
  ): Promise<Comision> {
    const comision = new Comision();
    comision.transaccion = transaccion;
    comision.monto = monto;
    comision.idCuentaBeneficiaria = transaccion.cuentaDestino.id;
    comision.fechaHora = new Date();

    return entityManager.save(comision);
  }
}
