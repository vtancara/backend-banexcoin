// src/services/transferencias.service.ts
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Cuenta } from '../cuentas/entities/cuenta.entity';
import { Transaccion } from './entities/transaccion.entity';
import { Comision } from '../comisiones/entities/comision.entity';

@Injectable()
export class TransaccionService {
  // Porcentaje de comisión (1%)
  private readonly PORCENTAJE_COMISION = 0.01;

  constructor(
    @InjectRepository(Cuenta)
    private cuentasRepository: Repository<Cuenta>,

    @InjectRepository(Transaccion)
    private transferenciasRepository: Repository<Transaccion>,

    @InjectRepository(Comision)
    private comisionesRepository: Repository<Comision>,

    private dataSource: DataSource,
  ) {}

  /**
   * Realiza una transferencia entre cuentas aplicando la comisión correspondiente
   */
  async realizarTransferencia(
    idCuentaOrigen: number,
    idCuentaDestino: number,
    monto: number,
  ): Promise<Transaccion> {
    // Validaciones iniciales
    if (idCuentaOrigen === idCuentaDestino) {
      throw new BadRequestException('No puedes transferir a la misma cuenta');
    }

    if (monto <= 0) {
      throw new BadRequestException('El monto debe ser mayor a cero');
    }

    // Calcular comisión (1% del monto)
    const valorComision = monto * this.PORCENTAJE_COMISION;
    // Total a descontar de la cuenta origen (monto + comisión)
    const totalADescontar = monto + valorComision;

    // Iniciar una transacción para garantizar consistencia
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Obtenemos las cuentas con bloqueo para evitar condiciones de carrera
      const cuentaOrigen = await queryRunner.manager.findOne(Cuenta, {
        where: { id: idCuentaOrigen },
        lock: { mode: 'pessimistic_write' }, // Bloqueo para evitar transferencias simultáneas inconsistentes
      });

      if (!cuentaOrigen) {
        throw new BadRequestException('Cuenta de origen no encontrada');
      }

      const cuentaDestino = await queryRunner.manager.findOne(Cuenta, {
        where: { id: idCuentaDestino },
        lock: { mode: 'pessimistic_write' },
      });

      if (!cuentaDestino) {
        throw new BadRequestException('Cuenta de destino no encontrada');
      }

      // Verificar si hay fondos suficientes (considerando la comisión)
      if (cuentaOrigen.saldo < totalADescontar) {
        throw new BadRequestException(
          'Fondos insuficientes para realizar la transferencia',
        );
      }

      // Actualizar saldos
      cuentaOrigen.saldo -= totalADescontar;
      cuentaDestino.saldo += monto;

      // Guardar los cambios en las cuentas
      await queryRunner.manager.save(cuentaOrigen);
      await queryRunner.manager.save(cuentaDestino);

      // Registrar la transferencia
      const transferencia = new Transaccion();
      transferencia.cuentaOrigen = cuentaOrigen;
      transferencia.cuentaDestino = cuentaDestino;
      transferencia.monto = monto;
      transferencia.fechaHora = new Date();
      const transferenciaGuardada =
        await queryRunner.manager.save(transferencia);

      // Registrar la comisión
      const comision = new Comision();
      comision.idTransaccion = transferenciaGuardada.id;
      comision.monto = valorComision;
      comision.fechaHora = new Date();
      comision.idCuentaBeneficiaria = idCuentaDestino;
      await queryRunner.manager.save(comision);

      // Confirmar la transacción
      await queryRunner.commitTransaction();

      return transferenciaGuardada;
    } catch (error) {
      // Revertir cambios en caso de error
      await queryRunner.rollbackTransaction();

      if (error instanceof BadRequestException) {
        throw error;
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      throw new InternalServerErrorException(
        'Error al procesar la transferencia: ' + errorMessage,
      );
    } finally {
      // Liberar el queryRunner
      await queryRunner.release();
    }
  }
}
