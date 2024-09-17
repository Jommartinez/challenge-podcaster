# Challenge Inditex Podcaster

Se trata de una aplicación para poder escuchar podcasts. La aplicación cuenta con 3 vistas:

1. Vista principal `/`
2. Detalles de un podcast `/podcast/:podcastId`
3. Detalle de un capitulo del podcast `podcast/:podcastId/episode/:episodeId`

La aplicación está diseñada como SPA por lo que la navegación se hace en todo momento desde el cliente.

En la jerarquía de carpetas, se puede ver la carpeta `dist` donde tenemos la aplicación compilada y minificada y la carpeta `src` donde nos encontramos con el código fuente del desarrollo.

# Stack tecnológico

- React 18.2.0
- TypeScript
- Vite
- Vitest
- React testing library
- Gestion de estado global con Contex
- Almacenaje en cliente con local storage

## Instrucciones de funcionamiento

Clonamos y accedemos al repositorio

> ```console
>  $ git clone https://github.com/Jommartinez/challenge-podcaster.git
>  $ cd challenge-podcaster
> ```

Instalamos dependencias e iniciamos el proyecto

> ```console
> $ npm install
> $ npm run dev
> ```

Para ejecutar los test utilizamos el siguiente comando

> ```console
> $ npm run test
> ```

Para ejecutar y visualizar el modo compilado de la aplicación

> ```console
> $ npm run build
> $ npm run preview
> ```
