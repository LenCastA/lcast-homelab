# Cómo montar un homelab parecido

La idea es reproducir el diseño por etapas. No hace falta instalar todas las herramientas de LCast ni usar el mismo portátil. Esta guía asume conocimientos básicos de terminal y propone comprobaciones antes de continuar.

## 1. Preparar el equipo

Elige un ordenador que puedas mantener encendido y comprueba discos, refrigeración y red. Guarda tus archivos antes de instalar el sistema. Identifica el disco de destino por capacidad y modelo; las particiones de este laboratorio no son una plantilla para otro equipo.

Instala Debian desde sus [medios oficiales](https://www.debian.org/distrib/). Una instalación mínima con SSH y sin escritorio es un buen punto de partida. Crea un usuario administrativo y aplica las actualizaciones iniciales.

**Comprueba:** puedes iniciar sesión, la red funciona, la hora es correcta y el equipo no se suspende inesperadamente al cerrar la tapa.

## 2. Establecer el acceso privado

Instala Tailscale en el servidor y en tu ordenador siguiendo su [guía para Linux](https://tailscale.com/download/linux). Autoriza ambos dispositivos y configura la política de acceso de tu tailnet. Mantén una forma local de recuperar el acceso.

Configura SSH con una clave propia. Antes de desactivar acceso por contraseña, verifica una segunda sesión con la clave. No publiques claves, códigos de recuperación ni datos de tu tailnet.

**Comprueba:** accedes por Tailscale desde otra red y puedes abrir SSH. Para esta primera etapa no necesitas DNS privado, un dominio ni abrir puertos del router.

## 3. Instalar Docker y una aplicación

Instala Docker Engine y el plugin Compose siguiendo la [guía oficial para Debian](https://docs.docker.com/engine/install/debian/). Mantén cada stack separado de sus datos persistentes. El acceso al socket de Docker y al grupo `docker` permite controlar el host: concédelo solo a quien administre el equipo.

Los comandos siguientes requieren un usuario autorizado para usar Docker. Si tu instalación requiere privilegios, ejecuta los comandos `docker` con `sudo`.

El repositorio incluye un [ejemplo mínimo de Uptime Kuma](https://github.com/LenCastA/lcast-homelab/tree/main/examples/minimal). Publica su puerto solo en loopback y conserva sus datos en un volumen Docker. Desde la raíz del repositorio:

```bash
cd examples/minimal
cp .env.example .env
docker compose config --quiet
docker compose up -d
docker compose ps
```

El ejemplo usa una etiqueta observada en LCast el 3 de octubre de 2026. Antes de instalarla revisa la versión y notas oficiales; para una instalación mantenida conviene fijar y actualizar versiones de forma deliberada.

En tu ordenador abre un túnel SSH, sustituyendo el usuario y el destino por los tuyos:

```bash
ssh -N -L 3001:127.0.0.1:3001 usuario@servidor
```

Visita `http://127.0.0.1:3001` en ese ordenador y crea tus propias credenciales. La sesión SSH debe permanecer abierta. El destino `servidor` es un marcador: usa el nombre o la dirección privada de tu equipo.

**Comprueba:** puedes acceder, el servicio conserva su configuración después de reiniciarlo y el puerto no queda publicado en todas las interfaces.

## 4. Definir persistencia y respaldos

Antes de añadir aplicaciones importantes, identifica qué datos debes conservar y cómo exportarlos. Una base de datos activa requiere una copia consistente, no simplemente copiar su directorio mientras escribe.

Configura Kopia con una contraseña nueva y custodiada fuera del servidor. Elige fuentes explícitas, una retención adecuada y un destino externo. Si usas rclone, empieza con `copy` y entiende cómo se mantienen y eliminan los datos del destino. Sigue [respaldos y recuperación](backups.md).

**Comprueba:** puedes restaurar un archivo y una aplicación de prueba en un directorio separado. Verifica que tus documentos personales también estén incluidos si quieres respaldarlos.

## 5. Añadir observación y alertas

Configura comprobaciones de disponibilidad y métricas. Beszel puede complementar Uptime Kuma; smartd vigila discos; ntfy permite enviar avisos. Una comprobación externa ayuda a detectar que el propio servidor dejó de avisar.

**Comprueba:** una interrupción controlada de una aplicación de prueba produce una alerta, y luego se detecta su recuperación. Evita generar alertas por servicios que has apagado deliberadamente.

## 6. Incorporar las herramientas útiles

Añade Homepage, Samba o SFTPGo según tus necesidades. Prueba permisos de archivos desde el cliente que usarás. Para aplicaciones pesadas incorpora una política de encendido y apagado por conjunto y observa el consumo de memoria.

Dokploy es una etapa adicional para desplegar proyectos. Su instalación administra Swarm y puede ocupar puertos o crear redes; revisa la [documentación de instalación](https://docs.dokploy.com/docs/core/installation) antes de mezclarlo con proxies existentes.

**Comprueba:** conoces qué herramienta administra cada stack y puedes actualizarlo y restaurarlo sin depender de recordar comandos improvisados.

## 7. Añadir nombres privados y publicación opcional

Cuando el acceso básico sea estable, puedes introducir Split DNS, CoreDNS y un proxy HTTPS privado. DNS-01 requiere un dominio propio y permisos limitados para administrar sus registros. Guarda el token DNS fuera del código.

Para compartir una aplicación pública puedes usar Cloudflare Tunnel. Define explícitamente el hostname y el servicio de destino. Revisa autenticación, rutas públicas y datos visibles de esa aplicación. Conserva paneles y bases en la red privada.

Los puertos publicados por Docker interactúan con las reglas de firewall; no basta con asumir que UFW bloqueará todo. Revisa la [documentación de Docker sobre firewalls](https://docs.docker.com/engine/network/packet-filtering-firewalls/) y verifica exposición desde otra máquina.

**Comprueba:** una persona externa solo puede acceder a la aplicación elegida. El DNS privado y las interfaces de administración siguen limitados a los dispositivos autorizados.

## Cuándo dar la instalación por terminada

El primer objetivo puede ser pequeño: acceso privado, una aplicación útil, persistencia, una alerta y una restauración comprobada. Luego amplía de acuerdo con tus recursos. El catálogo completo de [servicios](servicios.md) explica las posibilidades; no es una lista obligatoria.
