// src/dtos/realizar-transferencia.dto.ts
import { IsNumber, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class RealizarTransferenciaDto {
  @IsNotEmpty({ message: 'El ID de cuenta origen es requerido' })
  @IsNumber({}, { message: 'El ID de cuenta origen debe ser un número' })
  @Type(() => Number)
  idCuentaOrigen: number;

  @IsNotEmpty({ message: 'El ID de cuenta destino es requerido' })
  @IsNumber({}, { message: 'El ID de cuenta destino debe ser un número' })
  @Type(() => Number)
  idCuentaDestino: number;

  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(0.01, { message: 'El monto debe ser mayor a cero' })
  @Type(() => Number)
  monto: number;
}
