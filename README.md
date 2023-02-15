# API de AdonisJS

Este repositorio contiene la implementación de una API de AdonisJS. La API permite el ingreso, obtención, filtrado, actualización y eliminación de mascotas.

Configuración
Para configurar y ejecutar la API, siga los siguientes pasos:

1. Clone el repositorio en su máquina local usando el comando git clone **<URL del repositorio>**.
2. Ejecute **npm install** para instalar todas las dependencias necesarias.
3. Configure la base de datos en el archivo **.env** y ejecute las migraciones con el comando **node ace migration:run**.
4. Ejecute la aplicación con el comando **npm start** o **node ace serve _--watch_**.

## Rutas
La API tiene las siguientes rutas disponibles:

* POST **/ingresar_mascota/:** permite ingresar una mascota. Se espera que la solicitud tenga un cuerpo en formato JSON que contenga la información de la mascota.
* GET **/obtener_mascotas/:** permite obtener todas las mascotas ingresadas.
* GET **/filtrar/:** permite filtrar las mascotas según el nombre o la especie. Se espera que la solicitud tenga un parámetro de consulta llamado filtro que contenga el término a filtrar.
* PUT **/actualizar_mascota/:id:** permite actualizar la información de una mascota. Se espera que la solicitud tenga un cuerpo
