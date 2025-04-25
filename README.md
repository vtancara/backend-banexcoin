

## Sistema de Referidos

Cada transacción genera comisiones para quien te recomendó. ¡Únete y comienza a ganar!


### Explicación de la solución:

**Transacciones atómicas**: Utilizo un queryRunner para crear una transacción que garantiza que todas las operaciones (actualización de saldos, registro de transferencia y comisión) se realicen como una unidad atómica, asegurando la consistencia de datos.

**Bloqueo pesimista**: Implemento un bloqueo pesimista (pessimistic_write) para evitar condiciones de carrera cuando hay transferencias simultáneas desde la misma cuenta. Esto garantiza que no se pueda sobregirar la cuenta.

**Cálculo de comisiones:** La comisión es del 1% del monto transferido y se suma al total que se descuenta de la cuenta origen.

**Manejo de errores:** Si ocurre cualquier error durante el proceso, la transacción se revierte completamente, manteniendo la integridad de los datos.

Esta implementación maneja correctamente:

* Transferencias simultáneas desde la misma cuenta (usando bloqueos)
* Actualización consistente de saldos
* Aplicación y registro de comisiones
* Validaciones necesarias (saldo suficiente, montos válidos, cuentas existentes)

### Trabajos futuros
Por falta de tiempo no se ha podido realizar el siguiente punto:
  * Distribuir comisiones al referido (50% de la comisión)


### Pasos para ejecutar la aplicacion

Copiar el archivo .env.sample:

```bash
cp .env.sample .env
```

Configurar las variables de entorno en el archivo .env con la configuracion de la base de datos respesctiva:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=database
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar las migraciones:

```bash
npm run migration:run
```

Ejecutar las semillas:

```bash
npm run seed
```

Ejecutar la  aplicacion:

```bash
npm run dev
```