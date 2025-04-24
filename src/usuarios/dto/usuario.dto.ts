import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearUsuarioDto {
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;
}

export class ActualizarUsuarioDto {
  @IsOptional()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;
}
