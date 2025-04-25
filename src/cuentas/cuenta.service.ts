import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOptionsWhere, In, Repository } from 'typeorm';
import { Cuenta } from './entities/cuenta.entity';

@Injectable()
export class CuentaService {
  constructor(
    @InjectRepository(Cuenta)
    private cuentaRepository: Repository<Cuenta>,
  ) {}
  obtenerCuentas(idUsuario: number) {
    const cuentas = this.cuentaRepository.find({
      where: { idUsuario: idUsuario },
      relations: {
        usuario: true,
      },
    });
    return cuentas;
  }

  obtenerSaldo(id: number) {
    return this.cuentaRepository.findOne({
      where: { id },
      relations: {
        usuario: true,
      },
    });
  }

  /**
   * Verifica si varias cuentas existen
   */
  async verificarCuentasExisten(idsCuentas: number[]): Promise<void> {
    // Definir explícitamente las condiciones de búsqueda
    const whereCondition: FindOptionsWhere<Cuenta> = {
      id: In(idsCuentas),
    };

    try {
      // Especificar el tipo de retorno
      const cuentasEncontradas: number = await this.cuentaRepository.count({
        where: whereCondition,
      });
      if (cuentasEncontradas !== idsCuentas.length) {
        throw new BadRequestException('Una o más cuentas no existen');
      }
    } catch (error) {
      // Si es un error conocido, lo propagamos
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Para cualquier otro error, lo convertimos a uno genérico
      throw new BadRequestException('Error al verificar las cuentas');
    }
  }

  /**
   * Obtiene una cuenta con bloqueo para escritura
   */
  async obtenerCuentaConBloqueo(
    entityManager: EntityManager,
    idCuenta: number,
  ): Promise<Cuenta> {
    const cuenta = await entityManager.findOne(Cuenta, {
      where: { id: idCuenta },
      lock: { mode: 'pessimistic_write' },
    });

    if (!cuenta) {
      throw new BadRequestException(`Cuenta con ID ${idCuenta} no encontrada`);
    }

    return cuenta;
  }

  /**
   * Verifica si una cuenta tiene saldo suficiente
   */
  tieneSaldoSuficiente(cuenta: Cuenta, monto: number): boolean {
    return cuenta.saldo >= monto;
  }

  /**
   * Procesa una transferencia entre cuentas
   */
  async procesarTransferencia(
    entityManager: EntityManager,
    cuentaOrigen: Cuenta,
    cuentaDestino: Cuenta,
    monto: number,
    comision: number,
  ): Promise<{ cuentaOrigen: Cuenta; cuentaDestino: Cuenta }> {
    // Actualizamos los saldos
    cuentaOrigen.saldo -= Number(monto) + Number(comision);
    cuentaDestino.saldo = Number(cuentaDestino.saldo) + Number(monto);
    // Guardamos los cambios
    const [cuentaOrigenActualizada, cuentaDestinoActualizada] =
      await Promise.all([
        entityManager.save(cuentaOrigen),
        entityManager.save(cuentaDestino),
      ]);

    return {
      cuentaOrigen: cuentaOrigenActualizada,
      cuentaDestino: cuentaDestinoActualizada,
    };
  }
}
