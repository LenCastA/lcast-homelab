# Recursos oficiales

Estas páginas complementan la guía con instalación, configuración y comportamiento de cada herramienta. Los enlaces principales se consultaron al preparar la documentación el **3 de octubre de 2026**. Las versiones, límites de planes y comandos pueden cambiar; revisa la documentación del proveedor al instalar.

## Sistema y acceso

| Recurso | Uso |
| --- | --- |
| [Descargas de Debian](https://www.debian.org/distrib/) | Medios de instalación |
| [Docker Engine para Debian](https://docs.docker.com/engine/install/debian/) | Instalación soportada de Docker y Compose |
| [Docker y firewalls](https://docs.docker.com/engine/network/packet-filtering-firewalls/) | Reglas y exposición de puertos |
| [Tailscale para Linux](https://tailscale.com/download/linux) | Instalación y conexión privada |
| [DNS en Tailscale](https://tailscale.com/docs/reference/dns-in-tailscale) | MagicDNS y Split DNS |
| [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) | Conector saliente para aplicaciones |

## Aplicaciones y despliegue

| Recurso | Uso |
| --- | --- |
| [Instalación de Dokploy](https://docs.dokploy.com/docs/core/installation) | Preparar el gestor de despliegues |
| [Uptime Kuma](https://github.com/louislam/uptime-kuma) | Disponibilidad y ejemplo mínimo |
| [Homepage](https://gethomepage.dev/) | Portal privado |
| [Paperless-ngx](https://docs.paperless-ngx.com/) | Documentos y exportación |
| [Ansible](https://docs.ansible.com/) | Automatización de configuración |

## Respaldo y operación

| Recurso | Uso |
| --- | --- |
| [Primeros pasos con Kopia](https://kopia.io/docs/getting-started/) | Repositorio y snapshots |
| [Repositorios Kopia](https://kopia.io/docs/repositories/) | Opciones de almacenamiento y cifrado |
| [rclone copy](https://rclone.org/commands/rclone_copy/) | Copia sin borrar archivos del destino |
| [ntfy](https://docs.ntfy.sh/) | Avisos y control de acceso |
| [Trivy](https://trivy.dev/docs/) | Escaneo y límites de resultados |

## Cómo se elaboró la documentación

Se compararon documentación operativa, configuración de infraestructura y stacks, automatizaciones y registros del proyecto. Una consulta de solo lectura al servidor confirmó el sistema, el hardware, Docker y Swarm, los contenedores presentes y resultados de tareas programadas.

Los registros históricos se trataron como antecedentes. Las aplicaciones retiradas se señalan por separado y el estado puntual de un contenedor no se convierte en una garantía de disponibilidad.

Los repositorios operativos conservan información propia de la instalación. Este repositorio público fue escrito desde cero y contiene solo explicaciones y ejemplos nuevos. No necesita acceso a la infraestructura original para ser leído o usar el ejemplo mínimo.

## Actualizar esta guía

Al cambiar una herramienta, revisa su función, persistencia, exposición y recuperación. Actualiza la fecha de verificación cuando vuelvas a contrastar el servidor. Evita mantener cifras de disponibilidad o versiones como si fueran datos en tiempo real.
