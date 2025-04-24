import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './usuarios/usuario.module';
import { CuentaModule } from './cuentas/cuenta.module';
import databaseConfig from '../database/config';
import { ContactoModule } from './contacto/contacto.module';

@Module({
  imports: [
    // Módulo de configuración para cargar variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
    }),

    // AQUÍ ES DONDE SE CONFIGURA LA CONEXIÓN A LA BASE DE DATOS
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('database');
      },
    }),
    UsersModule,
    CuentaModule,
    ContactoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
