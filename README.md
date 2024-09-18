# Challenge Inditex Podcaster

Se trata de una aplicación para poder escuchar podcasts. La aplicación cuenta con 3 vistas:

1. Vista principal `/`
2. Detalles de un podcast `/podcast/:podcastId`
3. Detalle de un capitulo del podcast `podcast/:podcastId/episode/:episodeId`

La aplicación está diseñada como SPA por lo que la navegación se hace en todo momento desde el cliente.

En la vista principal hacemos uso del endpoint `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json` además contamos con un filtro en tiempo real donde podemos filtrar tanto por nombre de podcast como nombre de autor.

Para el detalle del podcast y episodios usamos el endpoint `https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20` el cual nos permite mostrar la información necesaria

Además para no tener problemas de CORS utilizamos el servicio `https://allorigins.win`

En la jerarquía de carpetas, se puede ver la carpeta `dist` donde tenemos la aplicación compilada y minificada (no suelo subirla al repositorio, pero el challenge pedia la aplicación minificada) y la carpeta `src` donde nos encontramos con el código fuente del desarrollo.

# Stack tecnológico

- React 18.2.0
- TypeScript
- Vite
- Vitest
- React testing library
- Zustand con persist para el estado global

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

## Demo del challenge

El proyecto ha sido desplegado en la siguiente url para fines de demostración : https://challenge-podcaster.vercel.app/
