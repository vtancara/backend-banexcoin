import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaccion } from './entities/transaccion.entity';
import { TransaccionService } from './transaccion.service';
import { TransaccionController } from './transaccion.controller';
import { CuentaService } from 'src/cuentas/cuenta.service';
import { ComisionService } from 'src/comisiones/comision.service';
import { Comision } from 'src/comisiones/entities/comision.entity';
import { Cuenta } from 'src/cuentas/entities/cuenta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaccion, Cuenta, Comision])],
  controllers: [TransaccionController],
  providers: [TransaccionService, CuentaService, ComisionService],
  exports: [TransaccionService, CuentaService, ComisionService],
})
export class TransaccionModule {}
