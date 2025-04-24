import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CrearUsuarioDto } from './dto/usuario.dto';
import { ActualizarUsuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  findOne(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { id } });
  }

  create(usuario: CrearUsuarioDto): Promise<Usuario> {
    const newUsuario = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(newUsuario);
  }

  async update(
    id: number,
    usuario: ActualizarUsuarioDto,
  ): Promise<Usuario | null> {
    await this.usuarioRepository.update(id, usuario);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
