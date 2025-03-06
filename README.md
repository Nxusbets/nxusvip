# Análisis de Pronósticos Deportivos

Este proyecto es una aplicación web creada con Next.js que permite gestionar y analizar pronósticos deportivos. Proporciona una interfaz para listar, modificar y eliminar pronósticos, así como para visualizar el rendimiento a través de una gráfica de ganancias diarias.

## Características Principales

* **Listado de Pronósticos:** Muestra una lista de pronósticos con detalles como el partido, el pronóstico, el resultado, la cuota y la ganancia.
* **Modificación de Estado:** Permite cambiar el estado de un pronóstico (Ganado, Ganancia Parcial, Perdido, Perdido Parcial) y actualizar la ganancia correspondiente.
* **Eliminación de Pronósticos:** Permite eliminar pronósticos de la lista.
* **Visualización de Ganancias:** Muestra la ganancia total y una gráfica de líneas que representa las ganancias por día.
* **Paginación:** Implementa paginación para manejar grandes cantidades de pronósticos, mostrando 10 pronósticos por página.
* **Interfaz Dinámica:** Utiliza `framer-motion` para animaciones y transiciones suaves.

## Tecnologías Utilizadas

* **Next.js:** Framework de React para la construcción de aplicaciones web.
* **React:** Librería de JavaScript para la creación de interfaces de usuario.
* **Axios:** Cliente HTTP para realizar peticiones a la API.
* **Recharts:** Librería de gráficos de React para la visualización de datos.
* **Framer Motion:** Librería para animaciones y gestos en React.
* **Bootstrap:** Framework CSS para el diseño de la interfaz de usuario.
* **MongoDB:** Base de datos NoSQL para almacenar los pronósticos.

## Configuración

1.  **Clona el repositorio:**

    ```bash
    git clone [https://github.com/theodelrieu?tab=repositories](https://github.com/theodelrieu?tab=repositories)
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**

    * Crea un archivo `.env.local` en la raíz del proyecto.
    * Añade la URL de tu base de datos MongoDB:

        ```
        MONGODB_URI=tu_url_de_mongodb
        ```

4.  **Ejecuta la aplicación en modo desarrollo:**

    ```bash
    npm run dev
    ```

5.  **Abre tu navegador y visita `http://localhost:3000`**

## Estructura del Proyecto

* `components/`: Contiene los componentes de React reutilizables.
    * `AnalisisPronosticos.js`: Componente principal para el análisis y gestión de pronósticos.
* `pages/api/`: Contiene las rutas de la API para interactuar con la base de datos.
* `pages/`: Contiene las páginas de la aplicación.
    * `index.js`: Página principal que muestra la lista de pronósticos y la gráfica.
* `styles/`: Contiene los archivos de estilos CSS.
* `.env.local`: Archivo para las variables de entorno.

## Paginación

La paginación se implementa en el componente `AnalisisPronosticos.js` para mostrar 10 pronósticos por página. Se utilizan los estados `currentPage` y `pronosticosPerPage` para controlar la página actual y el número de pronósticos por página, respectivamente. Los botones de paginación permiten navegar entre las páginas.

## Contribución

Las contribuciones son bienvenidas. Si encuentras algún error o tienes alguna sugerencia, por favor, abre un issue o envía un pull request.
