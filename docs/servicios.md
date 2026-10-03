# Catálogo de servicios

El laboratorio combina herramientas que permanecen disponibles con otras que se encienden al usarlas. Esta clasificación describe la política de operación, no una promesa de disponibilidad continua.

## Acceso, administración y despliegue

| Herramienta | Función | Uso |
| --- | --- | --- |
| Tailscale | Red privada entre dispositivos autorizados | Base del acceso remoto |
| SSH | Terminal y administración | En Debian |
| Cockpit | Inspección y administración del sistema | En Debian |
| OliveTin | Botones para acciones operativas definidas | En Debian |
| Ansible y Semaphore | Automatización y ejecución de playbooks | Según tarea |
| Docker Compose | Definición de stacks de herramientas | Base de contenedores |
| Dokploy y Docker Swarm | Despliegue de proyectos propios | Habitual |
| Portainer | Inspección de Docker | Habitual |
| Traefik y gateway Caddy | Proxy y acceso HTTP/HTTPS privado | Capa de red |
| CoreDNS y Tailscale Services | Nombres privados y acceso alternativo | Capa de red |
| Cloudflared | Publicación seleccionada con un túnel saliente | Para aplicaciones públicas |

## Archivos y herramientas de uso diario

| Herramienta | Función | Política |
| --- | --- | --- |
| Homepage | Portal de entrada a herramientas | Habitual |
| Markdown, Zensical y Caddy | Manual operativo generado como web estática | Documentación privada |
| Samba | Carpetas compartidas para Windows | Habitual |
| SFTPGo | Transferencia y gestión de acceso a archivos | Habitual |
| Mailpit | Captura de correo para desarrollo y pruebas | Habitual |
| OpenSpeedTest | Pruebas de velocidad hacia el servidor | Disponible para pruebas |
| Stirling PDF | Operaciones con PDF | Bajo demanda |
| Paperless-ngx | Archivo documental, importación y OCR | Bajo demanda |
| n8n | Automatización de flujos | Bajo demanda |
| SonarQube | Análisis de proyectos de software | Bajo demanda |

Mailpit recibe correo de pruebas; no sustituye un servicio de correo para usuarios. Encender Paperless-ngx o SonarQube puede implicar arrancar también sus bases de datos y componentes auxiliares. Se gestiona el conjunto como una unidad.

## Observación, alertas y mantenimiento

| Herramienta | Qué observa o hace |
| --- | --- |
| Uptime Kuma | Disponibilidad de endpoints y servicios |
| Beszel | Recursos del sistema y contenedores |
| Glances | Métricas usadas por el portal privado |
| smartmontools / smartd | Salud y señales SMART de discos |
| Scrutiny | Consulta e histórico de discos; interfaz bajo demanda |
| NetAlertX | Inventario y cambios de dispositivos en la red local |
| ntfy y relay de correo | Entrega de avisos operativos |
| Healthchecks externo | Comprobaciones de tareas y heartbeat |
| Diun y Renovate | Detección y propuesta de nuevas versiones |
| Trivy | Escaneo programado de vulnerabilidades |
| Kopia y rclone | Respaldo cifrado local y copia externa |

Scrutiny no necesita permanecer abierto para que exista vigilancia del disco: smartd y la recolección programada tienen papeles distintos. Las alertas deben llegar a un canal que se revise fuera del servidor.

## Aplicaciones retiradas

Forgejo y su runner, BookStack, Linkding y la instalación local de Healthchecks aparecen en registros históricos, pero fueron retirados. GitHub sigue siendo el origen de código y documentación, y Healthchecks se utiliza como servicio externo.

## Qué instalar primero

Para replicarlo empieza con Debian, Tailscale, Docker, una herramienta de disponibilidad y una estrategia de respaldo. Añade un portal y una aplicación útil. Dokploy, el DNS privado, la automatización y las aplicaciones pesadas pueden incorporarse después.

La lista completa explica el laboratorio actual. Instalarla de golpe en un equipo de 8 GB dificulta entender los fallos y controlar recursos. Continúa en la [guía por etapas](replicar.md).
