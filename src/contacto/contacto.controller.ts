import { Controller, Get } from '@nestjs/common';
import { ContactoService } from './contacto.service';

@Controller('contacto')
export class CuentaController {
  constructor(private readonly contactoService: ContactoService) {}
  @Get()
  listar() {
    return this.contactoService.listar();
  }
}
