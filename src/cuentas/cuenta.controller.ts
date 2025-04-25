import { Controller, Get, Param, Post } from '@nestjs/common';
import { CuentaService } from './cuenta.service';

@Controller('cuentas')
export class CuentaController {
  constructor(private readonly cuentaService: CuentaService) {}

  @Get('/usuario/:idUsuario')
  obtenerCuentas(@Param('idUsuario') idUsuario: number) {
    return this.cuentaService.obtenerCuentas(idUsuario);
  }

  @Get('/:id/saldo')
  obtenerSaldo(@Param('id') id: number) {
    return this.cuentaService.obtenerSaldo(id);
  }

  @Get('/:id/saldo')
  realizarTransferencia(@Param('id') id: number) {
    //return this.cuentaService.realizarTransferencia(id);
  }

  // obtener historial de transacciones
  @Get('/:id/historial')
  obtenerHistorial(@Param('id') id: number) {
    //return this.cuentaService.obtenerHistorial(id);
  }
}
