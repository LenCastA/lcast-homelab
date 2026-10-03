# Decisiones y alternativas

**Revisión: 3 de octubre de 2026.** Estas decisiones describen el diseño observado y sus límites. Sirven como referencia para adaptarlo a otro entorno.

## Reutilizar un portátil

Reutilizar un equipo con 8 GB de RAM permite practicar con una inversión contenida. Un mini PC puede ofrecer menor consumo o mayor capacidad; un servidor dedicado permite ampliar recursos, con más coste y mantenimiento. Las aplicaciones y su disponibilidad esperada determinan la elección. El [hardware](hardware.md) condiciona la concurrencia.

## Debian directamente en el equipo

Debian ejecuta servicios nativos y contenedores. Un hipervisor, como Proxmox, permitiría separar máquinas virtuales y experimentar con otros sistemas. Ejecutar Debian directamente reduce capas que administrar y reserva recursos para las aplicaciones. Los contenedores comparten el kernel del host; esa separación tiene límites.

## Compose y Dokploy con responsabilidades distintas

Docker Compose organiza servicios manuales y Dokploy utiliza Swarm para desplegar proyectos. Kubernetes añadiría componentes y trabajo operativo que este laboratorio de un solo nodo no necesita. La separación mantiene identificables las configuraciones y los datos. Un único equipo sigue sin ofrecer alta disponibilidad.

## Acceso privado y publicación selectiva

Tailscale permite administrar el homelab desde dispositivos autorizados. El DNS privado y el proxy facilitan usar nombres consistentes. Para una web pública se utiliza un túnel saliente de Cloudflare. Abrir puertos del router o contratar un VPS son alternativas posibles, con otras responsabilidades de exposición, coste y operación. Aquí la administración permanece privada y cada publicación se decide por separado. El funcionamiento depende también de conectividad y servicios externos.

## Encender las aplicaciones pesadas cuando se necesitan

SonarQube, Paperless-ngx, Stirling PDF, n8n y Scrutiny pueden funcionar bajo demanda. Mantener todo encendido simplificaría el acceso inmediato, pero aumenta el consumo de memoria. Ampliar RAM permitiría otra política. La swap ayuda ante presión puntual y tiene menor velocidad que la RAM. La decisión actual acepta un tiempo de arranque a cambio de recursos disponibles para otros usos.

## Separar persistencia, respaldo y observación

Las bases activas y los datos que necesitan permisos Linux permanecen en SSD con un sistema de archivos adecuado. Los archivos y el backup local utilizan el HDD. Kopia cifra el repositorio y Rclone copia una réplica externa. Un segundo disco en el mismo equipo sigue compartiendo riesgos físicos con él; la copia externa y las pruebas de restauración aportan otra protección. Monitorear un backup informa de su ejecución, mientras que restaurarlo comprueba su utilidad.

Consulta los [recursos oficiales](recursos.md), los [servicios](servicios.md), la [guía de réplica](replicar.md) o el [inicio](index.md).
