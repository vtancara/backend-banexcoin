import { Controller, Get, Param } from '@nestjs/common';
import { ContactoService } from './contacto.service';

@Controller('contactos')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}
  @Get('usuario/:idUsuario')
  obtenerContactos(@Param('idUsuario') idUsuario: number) {
    return this.contactoService.obtenerContactos(idUsuario);
  }
}
