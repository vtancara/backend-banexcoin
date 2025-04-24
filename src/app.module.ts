import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './usuarios/usuario.module';
import { CuentaModule } from './cuentas/cuenta.module';
import dotenv from 'dotenv';
import databaseConfig from '../database/config';

dotenv.config();

@Module({
  imports: [
    // Módulo de configuración para cargar variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
    }),

    // AQUÍ ES DONDE SE CONFIGURA LA CONEXIÓN A LA BASE DE DATOS
    TypeOrmModule.forRoot({
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    CuentaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
