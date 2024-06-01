# AUTH APP 
APP desarrollada con back en NestJS y front en Angular, con el fin de hacer pruebas de conexión de front Angular y back NestJS manejando login, register y rutas protejidas 

## DEV 

### BACK NestJs

1. Copiar el archivo `.env.template ` y renombrarlo a `.env`
2. Desplegar base datos mongo db en docker ejecutando comando 
   ```
   docker-compose up -d 
    ```
3. Iniciar aplicación ejecutando comando 
   ```
   npm run start:dev
   ```

### Front Angular 

1. Clonar el .env.template y renombrarlo a .env
2. Llenar las variables de entorno acorde
3. Crear Angular Envs (opcional)
   ```
   npm run envs
   ```
4. Para development ejecutar:
   ```
   npm run start
   ```
5. Para producción ejecutar:
   ```
   npm run build