# Arquitectura

El laboratorio combina servicios instalados en Debian con aplicaciones en contenedores. La administración utiliza una red privada; las aplicaciones que se quieren compartir tienen una ruta de publicación independiente.

## Las capas

| Capa | Componentes | Para qué sirve |
| --- | --- | --- |
| Equipo y sistema | Portátil, Debian 13, SSD y HDD | Ejecutar y almacenar |
| Acceso privado | Tailscale, SSH, DNS privado y HTTPS | Administrar desde dispositivos autorizados |
| Aplicaciones | Docker Compose, Dokploy y Docker Swarm | Ejecutar herramientas y proyectos |
| Operación | Cockpit, OliveTin, Ansible y Semaphore | Inspeccionar y ejecutar tareas definidas |
| Observación | Uptime Kuma, Beszel, SMART, ntfy y comprobaciones externas | Detectar fallos y avisar |
| Recuperación | Preparación por aplicación, Kopia y rclone | Guardar copias recuperables |

## Vista general

```text
Dispositivo autorizado
        |
     Tailscale
        |
 Administración privada ---- SSH / Cockpit / OliveTin
        |
   Servicios en Debian y Docker
        |
        +---- SSD: sistema y persistencia de aplicaciones
        +---- HDD: archivos y repositorio Kopia
                           |
                    copia cifrada externa
                       Google Drive

Visitante de una app pública
        |
     Cloudflare
        |
  Tunnel saliente desde el servidor
        |
  Traefik / aplicación elegida en Dokploy
```

## Acceso privado

Tailscale conecta los dispositivos autorizados. Para empezar basta con acceder al servidor por esa red y usar SSH. La instalación completa añade nombres internos y HTTPS:

1. Split DNS dirige las consultas del dominio privado a CoreDNS.
2. CoreDNS escucha en la dirección Tailscale del servidor y resuelve los nombres hacia el acceso privado.
3. Traefik termina HTTPS con certificados obtenidos mediante DNS-01.
4. Un gateway Caddy conecta esa entrada con los servicios internos.

Tailscale Services ofrece una vía alternativa de acceso. Samba y SFTP utilizan sus propias rutas y permisos.

El acceso se controla con la política de Tailscale y la autenticación de cada aplicación. Los certificados permiten usar HTTPS con esos nombres. Consulta la [configuración de DNS en Tailscale](https://tailscale.com/docs/reference/dns-in-tailscale).

## Aplicaciones públicas

Cloudflared mantiene un túnel saliente hacia Cloudflare. Se publica la aplicación elegida y se conserva la administración en la red privada. Este recorrido evita depender de una redirección de puertos entrantes en el router. Véase [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/).

## Compose y Swarm

Docker Compose organiza herramientas del laboratorio. Dokploy administra despliegues de proyectos mediante Docker Swarm y utiliza Traefik como proxy. Portainer ayuda a inspeccionar contenedores y servicios.

Conviene que cada aplicación tenga un único responsable de despliegue. Editar manualmente un contenedor administrado por Dokploy puede perderse en el siguiente despliegue.

Swarm funciona en un único nodo. Todos los despliegues dependen de ese equipo y se detienen cuando se apaga.

## Persistencia y automatización

La configuración de los stacks y los datos persistentes se organizan por separado. Las bases activas se alojan en un sistema de archivos Linux del SSD. Las copias preparadas se incorporan al repositorio cifrado de Kopia y se copian al almacenamiento externo.

Systemd programa respaldos, comprobaciones, vigilancia de contenedores y mantenimiento. OliveTin expone acciones concretas; Semaphore ejecuta automatización con Ansible. Las credenciales necesarias se mantienen fuera de los repositorios públicos.
