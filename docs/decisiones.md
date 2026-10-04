# Decisiones y alternativas

Las elecciones del laboratorio responden al equipo disponible, las aplicaciones y el trabajo de mantenimiento.

## Reutilizar un portátil

Reutilizar un equipo con 8 GB de RAM permite practicar con una inversión contenida. Un mini PC puede ofrecer menor consumo o mayor capacidad. Un servidor dedicado permite ampliar recursos, con más coste y mantenimiento. El [hardware](hardware.md) condiciona la concurrencia.

## Debian directamente en el equipo

Debian ejecuta servicios nativos y contenedores. Un hipervisor, como Proxmox, permitiría separar máquinas virtuales y experimentar con otros sistemas. Ejecutar Debian directamente reduce capas que administrar y reserva recursos para las aplicaciones. Los contenedores comparten el kernel del host.

## Compose y Dokploy con responsabilidades distintas

Docker Compose organiza servicios manuales y Dokploy utiliza Swarm para desplegar proyectos. Kubernetes añadiría componentes y trabajo operativo para este laboratorio de un solo nodo. La separación mantiene identificables las configuraciones y los datos.

## Acceso privado y publicación selectiva

Tailscale permite administrar el homelab desde dispositivos autorizados. El DNS privado y el proxy facilitan usar nombres consistentes. Una web pública se despliega con Dokploy y se comparte mediante un túnel saliente de Cloudflare. Abrir puertos del router o contratar un VPS son alternativas con otras responsabilidades de exposición, coste y operación. La administración permanece privada y cada publicación se decide por separado.

## Encender las aplicaciones pesadas cuando se necesitan

SonarQube, Paperless-ngx, Stirling PDF, n8n y Scrutiny funcionan bajo demanda. Mantener todo encendido simplificaría el acceso inmediato y aumentaría el consumo de memoria. Ampliar RAM permitiría otra política. La swap ayuda ante presión puntual, con menor velocidad que la RAM. Se acepta un tiempo de arranque para disponer de recursos para otros usos.

## Separar persistencia, respaldo y observación

Las bases activas y los datos que necesitan permisos Linux permanecen en SSD. Los archivos y el backup local utilizan el HDD. Kopia cifra el repositorio y Rclone copia una réplica externa para cubrir pérdidas que afecten al equipo. Restaurar una muestra permite comprobar que el respaldo es útil.

Consulta los [recursos oficiales](recursos.md), los [servicios](servicios.md), la [guía de réplica](replicar.md) o el [inicio](index.md).
