# LCast Homelab

Un portátil reutilizado como servidor casero para guardar archivos, ejecutar aplicaciones, publicar proyectos y aprender a administrar infraestructura.

La base es sencilla: **Debian 13, Docker, acceso privado con Tailscale y respaldos con Kopia**. Alrededor hay herramientas para desplegar proyectos, observar el equipo y automatizar tareas. Todo corre en un único equipo con 8 GB de RAM, por lo que las aplicaciones más pesadas se encienden cuando se necesitan.

## Qué permite hacer

- Acceder a archivos desde Windows por Samba o transferirlos con SFTPGo.
- Tener un punto de entrada para las herramientas con Homepage.
- Desplegar aplicaciones propias con Dokploy y Docker Swarm.
- Procesar documentos con Paperless-ngx y Stirling PDF, automatizar tareas con n8n y revisar código con SonarQube.
- Recibir alertas de disponibilidad, recursos, discos y tareas programadas.
- Preparar copias consistentes de aplicaciones y mantener un respaldo cifrado fuera del equipo.

## El equipo

| Componente | Configuración |
| --- | --- |
| Equipo | Lenovo IdeaPad 330-15ARR reutilizado |
| Procesador | AMD Ryzen 7 2700U, 4 núcleos y 8 hilos |
| Memoria | 8 GB de RAM y 8 GiB de swap |
| Disco principal | SSD de 960 GB para sistema y datos de aplicaciones |
| Disco secundario | HDD de 2 TB para archivos y respaldo local |
| Sistema | Debian GNU/Linux 13 instalado directamente |

Puedes empezar con otro ordenador y un conjunto pequeño de servicios.

## Por dónde empezar

Si quieres entenderlo, comienza por la [arquitectura](arquitectura.md), el [hardware y almacenamiento](hardware.md) y el [catálogo de servicios](servicios.md).

Si quieres construir algo parecido, sigue la [guía de replicación](replicar.md). Después revisa la [operación](operacion.md), los [respaldos y recuperación](backups.md) y las [decisiones de diseño](decisiones.md).

Las [referencias oficiales](recursos.md) complementan los pasos de instalación y configuración de cada herramienta.
