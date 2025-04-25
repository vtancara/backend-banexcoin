import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { RealizarTransferenciaDto } from './dto/transaccion.dto';

@Controller('transacciones')
export class TransaccionController {
  constructor(private readonly transaccionService: TransaccionService) {}

  @Post()
  realizarTransferencia(@Body() transferenciaDto: RealizarTransferenciaDto) {
    return this.transaccionService.realizarTransferencia(
      transferenciaDto.idCuentaOrigen,
      transferenciaDto.idCuentaDestino,
      transferenciaDto.monto,
    );
  }

  @Get('enviadas/:idCuenta')
  obtenerTransferenciasEnviadas(@Param('idCuenta') idCuenta: number) {
    return this.transaccionService.obtenerTransferenciasEnviadas(idCuenta);
  }

  @Get('recibidas/:idCuenta')
  obtenerTransferenciasRecibidas(@Param('idCuenta') idCuenta: number) {
    return this.transaccionService.obtenerTransferenciasRecibidas(idCuenta);
  }
}
