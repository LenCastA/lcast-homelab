# LCast Homelab

Un servidor casero construido con un portátil reutilizado: Debian, Docker, acceso privado con Tailscale, aplicaciones bajo demanda, monitoreo y respaldos cifrados.

**[Leer la web](https://homelab.lengcast.com)** · **[Montar algo parecido](docs/replicar.md)**

## Contenido

| Página | Qué encontrarás |
| --- | --- |
| [Inicio](docs/index.md) | El laboratorio y sus usos |
| [Arquitectura](docs/arquitectura.md) | Capas, red privada y publicación de aplicaciones |
| [Hardware](docs/hardware.md) | Equipo, recursos y almacenamiento |
| [Servicios](docs/servicios.md) | Herramientas habituales y bajo demanda |
| [Replicación](docs/replicar.md) | Montaje por etapas |
| [Operación](docs/operacion.md) | Actualizaciones, observación y alertas |
| [Backups](docs/backups.md) | Copia externa y recuperación |
| [Decisiones](docs/decisiones.md) | Motivos y alternativas |
| [Recursos](docs/recursos.md) | Documentación de las herramientas |

## Desarrollo

Requiere Node.js 20 o posterior. El Markdown de `docs/` es la fuente de la web.

```bash
npm ci
npm run build
npm run preview
```

La compilación genera `dist/`. Incluye búsqueda local, índice por capítulo y fuentes servidas desde el propio sitio.

## Despliegue con Dokploy

1. Crea una aplicación y conecta este repositorio, rama `main`, ruta `/`.
2. Selecciona **Dockerfile** como método de compilación, archivo `Dockerfile` y contexto `.`.
3. Añade tu dominio con puerto de destino **80** y ruta `/`.
4. Despliega. La imagen compila los documentos y Nginx sirve la web.

Si usas Cloudflare Tunnel, añade el hostname a tu túnel apuntando al proxy de Dokploy, por ejemplo `http://dokploy-traefik:80`, y su registro DNS. Cloudflare atiende el HTTPS público; el dominio de Dokploy usa HTTP dentro de la red Docker. Con publicación directa, configura HTTPS en Dokploy.

Para actualizar, sube los cambios a GitHub y vuelve a desplegar desde Dokploy. La integración continua comprueba la compilación en cada push y pull request.

También puedes probar la imagen localmente:

```bash
docker build -t lcast-homelab .
docker run --rm -p 127.0.0.1:8080:80 lcast-homelab
```

## Ejemplo mínimo

[examples/minimal](examples/minimal/README.md) contiene Uptime Kuma con un volumen persistente y acceso mediante un túnel SSH.

## Contribuir

Edita los documentos, compila y revisa los enlaces. Usa valores de ejemplo en las configuraciones y conserva los secretos de tu entorno fuera del repositorio.

## Licencia

[MIT](LICENSE) para el código y la documentación. Las herramientas descritas y las fuentes conservan sus propias licencias.
