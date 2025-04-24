import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuenta } from './entities/cuenta.entity';

@Injectable()
export class CuentaService {
  constructor(
    @InjectRepository(Cuenta)
    private cuentaRepository: Repository<Cuenta>,
  ) {}
  obtenerCuentas(idUsuario: number) {
    console.log('QUIERE_OBTENER_CUENETAS', idUsuario);
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
}
