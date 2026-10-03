# LCast Homelab

Documentación pública de un servidor casero construido con un portátil reutilizado: Debian 13, Docker, acceso privado con Tailscale, aplicaciones bajo demanda, monitoreo y respaldos cifrados.

**[Leer la web](https://lcast-homelab.lenin61121.chatgpt.site)** · **[Guía para montar algo parecido](docs/replicar.md)**

El diseño se contrastó con documentación, repositorios del proyecto y una consulta de solo lectura al servidor el **3 de octubre de 2026**. Los ejemplos son nuevos y no contienen la configuración privada de la instalación.

## Contenido

| Página | Qué encontrarás |
| --- | --- |
| [Inicio](docs/index.md) | Qué es el laboratorio y qué permite hacer |
| [Arquitectura](docs/arquitectura.md) | Capas, red privada y publicación de aplicaciones |
| [Hardware](docs/hardware.md) | Portátil, recursos y organización del almacenamiento |
| [Servicios](docs/servicios.md) | Herramientas habituales, bajo demanda y retiradas |
| [Replicación](docs/replicar.md) | Montaje por etapas y comprobaciones |
| [Operación](docs/operacion.md) | Actualización controlada, observación y alertas |
| [Backups](docs/backups.md) | Cobertura, copia externa y recuperación |
| [Decisiones](docs/decisiones.md) | Motivos, alternativas y límites |
| [Recursos](docs/recursos.md) | Referencias oficiales y método de verificación |

## Generar la web

Requiere Node.js 20 o posterior y npm. El Markdown de `docs/` es la fuente del sitio; no hay que editar una segunda copia del contenido.

```bash
npm ci
npm run build
npm run preview
```

La compilación produce `dist/`. La vista previa indica su dirección local. La web contiene navegación, índice por capítulo y búsqueda local; se puede alojar como archivos estáticos sin backend ni credenciales.

La integración continua comprueba la compilación en cada push y pull request. El contenido de `dist/` puede publicarse en un proveedor de hosting estático. Conserva las rutas y sirve los archivos `index.html` de cada directorio.

## Ejemplo mínimo

[examples/minimal](examples/minimal/README.md) contiene Uptime Kuma con un volumen persistente y acceso mediante un túnel SSH. La sintaxis se validó con Docker Compose; no se desplegó al preparar este repositorio. Cada persona debe crear sus credenciales y definir sus propios respaldos.

## Editar y compartir

Edita los archivos Markdown, compila y revisa los enlaces antes de publicar. Los cambios en este repositorio no modifican el servidor original. La publicación alojada de la web debe actualizarse con el nuevo contenido compilado.

Antes de añadir ejemplos, revisa que no contengan tokens, contraseñas, claves, direcciones de la instalación, configuraciones privadas ni datos personales. Mantén separados los valores de tu entorno. No subas respaldos o archivos de recuperación al repositorio.

El laboratorio utiliza un único equipo y una conexión doméstica. La guía describe una arquitectura adaptable; no promete alta disponibilidad ni tiempos de recuperación medidos.

## Licencia

[MIT](LICENSE), para el código y la documentación de este repositorio. Las herramientas descritas mantienen sus propias licencias.
