import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { CrearUsuarioDto } from './dto/usuario.dto';
import { ActualizarUsuarioDto } from './dto/usuario.dto';

@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsuarioService) {}

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuario | null> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(
    @Body(ValidationPipe) createUserDto: CrearUsuarioDto,
  ): Promise<Usuario> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: ActualizarUsuarioDto,
  ): Promise<Usuario | null> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
