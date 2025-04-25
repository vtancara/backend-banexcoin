

## Sistema de Referidos

Cada transacción genera comisiones para quien te recomendó. ¡Únete y comienza a ganar!

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