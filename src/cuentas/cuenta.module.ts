import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentaController } from './cuenta.controller';
import { CuentaService } from './cuenta.service';
import { Cuenta } from './entities/cuenta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuenta])],
  controllers: [CuentaController],
  providers: [CuentaService],
})
export class CuentaModule {}
