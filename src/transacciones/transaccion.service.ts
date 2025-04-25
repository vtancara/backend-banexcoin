// src/services/transferencias.service.ts
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ComisionService } from 'src/comisiones/comision.service';
import { CuentaService } from 'src/cuentas/cuenta.service';
import { DataSource, Repository } from 'typeorm';
import { Transaccion } from './entities/transaccion.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransaccionService {
  // Porcentaje de comisión (1%)
  private readonly PORCENTAJE_COMISION = 0.01;

  constructor(
    private dataSource: DataSource,
    private cuentasService: CuentaService,
    private comisionesService: ComisionService,
    @InjectRepository(Transaccion)
    private transferenciasRepository: Repository<Transaccion>,
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
      const transactionManager = queryRunner.manager;

      // Verificamos si las cuentas existen antes de bloquearlas
      await this.cuentasService.verificarCuentasExisten([
        idCuentaOrigen,
        idCuentaDestino,
      ]);

      // Obtenemos las cuentas con bloqueo (delegamos al servicio de cuentas)
      const cuentaOrigen = await this.cuentasService.obtenerCuentaConBloqueo(
        transactionManager,
        idCuentaOrigen,
      );
      const cuentaDestino = await this.cuentasService.obtenerCuentaConBloqueo(
        transactionManager,
        idCuentaDestino,
      );

      // Verificar si hay fondos suficientes (delegamos al servicio de cuentas)
      if (
        !this.cuentasService.tieneSaldoSuficiente(cuentaOrigen, totalADescontar)
      ) {
        throw new BadRequestException(
          'Fondos insuficientes para realizar la transferencia',
        );
      }

      // Actualizar saldos de las cuentas (delegamos al servicio de cuentas)
      const cuentasActualizadas =
        await this.cuentasService.procesarTransferencia(
          transactionManager,
          cuentaOrigen,
          cuentaDestino,
          monto,
          valorComision,
        );

      // Registrar la transferencia
      const transferencia = new Transaccion();
      transferencia.cuentaOrigen = cuentasActualizadas.cuentaOrigen;
      transferencia.cuentaDestino = cuentasActualizadas.cuentaDestino;
      transferencia.monto = monto;
      transferencia.fechaHora = new Date();
      const transferenciaGuardada =
        await transactionManager.save(transferencia);

      // Registrar la comisión (delegamos al servicio de comisiones)
      await this.comisionesService.crearComision(
        transactionManager,
        transferenciaGuardada,
        valorComision,
      );

      // Confirmar la transacción
      await queryRunner.commitTransaction();

      return transferenciaGuardada;
    } catch (error) {
      // Revertir cambios en caso de error
      await queryRunner.rollbackTransaction();

      if (error instanceof BadRequestException) {
        throw error;
      }

      // Mejor manejo del error
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      console.error('Error en transferencia:', error);

      throw new InternalServerErrorException(
        `Error al procesar la transferencia: ${errorMessage}`,
      );
    } finally {
      // Liberar el queryRunner
      await queryRunner.release();
    }
  }

  async obtenerTransferenciasEnviadas(idCuenta: number) {
    return this.transferenciasRepository.find({
      where: { cuentaOrigen: { id: idCuenta } },
      relations: ['cuentaOrigen', 'cuentaDestino', 'comision'],
      order: { fechaHora: 'DESC' },
    });
  }

  async obtenerTransferenciasRecibidas(idCuenta: number) {
    return this.transferenciasRepository.find({
      where: { cuentaDestino: { id: idCuenta } },
      relations: ['cuentaOrigen', 'cuentaDestino'],
      order: { fechaHora: 'DESC' },
    });
  }
}
