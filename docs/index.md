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

| Componente | Configuración observada |
| --- | --- |
| Equipo | Lenovo IdeaPad 330-15ARR reutilizado |
| Procesador | AMD Ryzen 7 2700U, 4 núcleos y 8 hilos |
| Memoria | 8 GB de RAM y 8 GiB de swap |
| Disco principal | SSD de 960 GB para sistema y datos de aplicaciones |
| Disco secundario | HDD de 2 TB para archivos y respaldo local |
| Sistema | Debian GNU/Linux 13 instalado directamente |

Las capacidades comerciales de los discos son distintas de las que muestra Linux en GiB. Estas especificaciones describen este equipo; se puede empezar con otro ordenador y menos servicios.

## Por dónde empezar

Si quieres entenderlo, comienza por la [arquitectura](arquitectura.md), el [hardware y almacenamiento](hardware.md) y el [catálogo de servicios](servicios.md).

Si quieres construir algo parecido, sigue la [guía de replicación](replicar.md). Después revisa la [operación](operacion.md), los [respaldos y recuperación](backups.md) y las [decisiones de diseño](decisiones.md).

## Alcance de esta documentación

La configuración general se contrastó con repositorios y documentación del proyecto, y con una consulta de solo lectura al servidor el **3 de octubre de 2026**. Las versiones concretas de las aplicaciones y su estado de encendido cambian; aquí se describe su función y política de uso.

Es una explicación pública y una guía por etapas. Los ejemplos usan valores ficticios y configuración nueva. Las instrucciones específicas de cada herramienta están enlazadas en [recursos](recursos.md). El inventario no es un panel de estado en tiempo real.

El laboratorio depende de un único equipo, de la conexión doméstica y de algunos servicios externos. No se han medido aquí consumo eléctrico, alta disponibilidad ni tiempos garantizados de recuperación.
