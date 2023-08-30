# Prueba de Desarrollo para SynAgro

Este proyecto es una plataforma de blog de publicaciones desarrollada como parte de la prueba de desarrollo para SynAgro. Permite a los usuarios ver, crear, editar y eliminar publicaciones relacionadas con diferentes temas. También incluye un sistema de autenticación utilizando Firebase, lo que permite a los usuarios registrarse, iniciar sesión y gestionar sus propias publicaciones.

## Cómo Ejecutar el Proyecto

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Instalación de Dependencias:**
   Abre una terminal en la carpeta raíz del proyecto y ejecuta el siguiente comando para instalar las dependencias:

   ```sh
   npm install



2. **Iniciar el Servidor JSON:**
    Primero, inicia el servidor JSON simulado para simular el backend de la plataforma. Ejecuta el siguiente comando:

    ```sh
    npm run json-server

Esto iniciará el servidor JSON en http://localhost:5000, proporcionando datos simulados de las publicaciones.

3. **Iniciar la Aplicación React:**
    En otra terminal, manteniéndote en la carpeta raíz del proyecto, ejecuta el siguiente comando para iniciar la aplicación de React:

    ```sh
    npm start
Esto iniciará la aplicación en el navegador y podrás verla en http://localhost:3000.

Funcionalidades Principales
Vista de Publicaciones: Al acceder a la plataforma, verás una lista de distintas publicaciones con su titulo, autor y resumen.

Autenticación de Usuario: La plataforma utiliza Firebase para la autenticación de usuarios. Puedes registrarte con una cuenta o iniciar sesión si ya tienes una.

Gestión de Publicaciones: Una vez autenticado, cada usuario puede gestionar sus propias publicaciones. Puede crear nuevas, editar las existentes o eliminarlas.

Tecnologías Utilizadas
React: Biblioteca JavaScript para construir interfaces de usuario interactivas.
Firebase: Plataforma de desarrollo de aplicaciones móviles y web que proporciona servicios de autenticación y almacenamiento en la nube.
JSON Server: Herramienta para crear un servidor JSON de simulación para desarrollo y pruebas.