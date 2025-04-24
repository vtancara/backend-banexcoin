import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacto } from './entities/contacto.entity';

@Injectable()
export class ContactoService {
  constructor(
    @InjectRepository(Contacto)
    private contactoRepository: Repository<Contacto>,
  ) {}

  obtenerContactos(idUsuario: number) {
    return this.contactoRepository.find({
      where: { idUsuario },
      relations: {
        contacto: true,
      },
    });
  }
}
