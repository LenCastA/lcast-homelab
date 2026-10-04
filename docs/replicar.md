# Cómo montar un homelab parecido

Comienza con acceso privado, una aplicación y un respaldo. Después añade las herramientas que necesites. Los pasos usan una terminal Linux y proponen comprobaciones antes de continuar.

## 1. Preparar el equipo

Elige un ordenador y comprueba discos, refrigeración y red. Guarda tus archivos antes de instalar el sistema. Identifica el disco de destino por capacidad y modelo y elige un particionado adecuado para tus datos.

Instala Debian desde sus [medios oficiales](https://www.debian.org/distrib/). Una instalación mínima con SSH y sin escritorio es un buen punto de partida. Crea un usuario administrativo y aplica las actualizaciones iniciales.

**Comprueba:** puedes iniciar sesión, la red funciona, la hora es correcta y el equipo no se suspende inesperadamente al cerrar la tapa.

## 2. Establecer el acceso privado

Instala Tailscale en el servidor y en tu ordenador siguiendo su [guía para Linux](https://tailscale.com/download/linux). Autoriza ambos dispositivos y configura la política de acceso de tu tailnet. Mantén una forma local de recuperar el acceso.

Configura SSH con una clave propia. Antes de desactivar el acceso por contraseña, verifica una segunda sesión con la clave. Custodia las claves privadas y los códigos de recuperación.

**Comprueba:** accedes por Tailscale desde otra red y puedes abrir SSH.

## 3. Instalar Docker y una aplicación

Instala Docker Engine y el plugin Compose siguiendo la [guía oficial para Debian](https://docs.docker.com/engine/install/debian/). Mantén cada stack separado de sus datos persistentes. El acceso al socket de Docker y al grupo `docker` permite controlar el host: concédelo solo a quien administre el equipo.

Usa un usuario autorizado para Docker o ejecuta los comandos `docker` con `sudo`.

El repositorio incluye un [ejemplo mínimo de Uptime Kuma](https://github.com/LenCastA/lcast-homelab/tree/main/examples/minimal). Publica su puerto solo en loopback y conserva sus datos en un volumen Docker. Desde la raíz del repositorio:

```bash
cd examples/minimal
cp .env.example .env
docker compose config --quiet
docker compose up -d
docker compose ps
```

Revisa `KUMA_IMAGE` en `.env` y las notas oficiales antes de instalar. Mantén una versión elegida y actualízala de forma deliberada.

En tu ordenador abre un túnel SSH. Sustituye `usuario@servidor` por tu usuario y el nombre o dirección privada de tu equipo:

```bash
ssh -N -L 3001:127.0.0.1:3001 usuario@servidor
```

Visita `http://127.0.0.1:3001` en ese ordenador y crea tus credenciales. Mantén abierta la sesión SSH.

**Comprueba:** puedes acceder, el servicio conserva su configuración después de reiniciarlo y el puerto no queda publicado en todas las interfaces.

## 4. Definir persistencia y respaldos

Antes de añadir aplicaciones importantes, identifica qué datos debes conservar y cómo exportarlos. Para una base activa utiliza su mecanismo de backup o una copia en frío.

Configura Kopia con una contraseña propia y custodiada fuera del servidor. Elige fuentes explícitas, retención y destino externo. Si usas rclone, empieza con `copy` y define cómo mantener los datos del destino. Sigue [respaldos y recuperación](backups.md).

**Comprueba:** puedes restaurar un archivo y una aplicación de prueba en un directorio separado. Verifica que tus documentos personales también estén incluidos si quieres respaldarlos.

## 5. Añadir observación y alertas

Configura comprobaciones de disponibilidad y métricas. Beszel puede complementar Uptime Kuma; smartd vigila discos; ntfy permite enviar avisos. Una comprobación externa ayuda a detectar que el propio servidor dejó de avisar.

**Comprueba:** una interrupción controlada de una aplicación de prueba produce una alerta y después se detecta su recuperación. Ajusta los monitores a la política de encendido de cada servicio.

## 6. Incorporar las herramientas útiles

Añade Homepage, Samba o SFTPGo según tus necesidades. Prueba permisos de archivos desde el cliente que usarás. Para aplicaciones pesadas incorpora una política de encendido y apagado por conjunto y observa el consumo de memoria.

Dokploy es una etapa adicional para desplegar proyectos. Su instalación administra Swarm y puede ocupar puertos o crear redes; revisa la [documentación de instalación](https://docs.dokploy.com/docs/core/installation) antes de mezclarlo con proxies existentes.

**Comprueba:** conoces qué herramienta administra cada stack y tienes un procedimiento para actualizarlo y restaurarlo.

## 7. Añadir nombres privados y publicación opcional

Cuando el acceso básico sea estable, puedes introducir Split DNS, CoreDNS y un proxy HTTPS privado. DNS-01 requiere un dominio propio y permisos limitados para administrar sus registros. Guarda el token DNS fuera del código.

Para compartir una aplicación pública puedes usar Cloudflare Tunnel. Define explícitamente el hostname y el servicio de destino. Revisa autenticación, rutas públicas y datos visibles de esa aplicación. Conserva paneles y bases en la red privada.

Docker aplica sus propias reglas a los puertos publicados. Revisa la [documentación sobre firewalls](https://docs.docker.com/engine/network/packet-filtering-firewalls/) y verifica la exposición desde otra máquina, además de configurar UFW.

**Comprueba:** una persona externa solo puede acceder a la aplicación elegida. El DNS privado y las interfaces de administración siguen limitados a los dispositivos autorizados.

## Cuándo dar la instalación por terminada

Cuando tengas acceso privado, una aplicación útil, persistencia, una alerta y una restauración comprobada, puedes ampliar según tus recursos. Consulta el [catálogo de servicios](servicios.md) para elegir el siguiente paso.
