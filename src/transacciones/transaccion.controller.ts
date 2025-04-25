import { Body, Controller, Post } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { RealizarTransferenciaDto } from './dto/transaccion.dto';

@Controller('transacciones')
export class CuentaController {
  constructor(private readonly transaccionService: TransaccionService) {}

  @Post()
  realizarTransferencia(@Body() transferenciaDto: RealizarTransferenciaDto) {
    return this.transaccionService.realizarTransferencia(
      transferenciaDto.idCuentaOrigen,
      transferenciaDto.idCuentaDestino,
      transferenciaDto.monto,
    );
  }
}
