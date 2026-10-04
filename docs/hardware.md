# Hardware y almacenamiento

LCast utiliza un Lenovo IdeaPad 330-15ARR que ya estaba disponible. Debian 13 está instalado directamente en el equipo. La CPU es un Ryzen 7 2700U de cuatro núcleos y ocho hilos; la RAM instalada es de 8 GB.

## Cómo se reparten los discos

| Disco | Capacidad comercial | Uso en el laboratorio |
| --- | --- | --- |
| SSD Kingston A400 | 960 GB | Debian, Docker, bases de datos y persistencias activas |
| HDD Seagate | 2 TB | Documentos, archivos compartidos y repositorio de respaldo local |

Debian ocupa parte del SSD, con ext4 para la raíz y una partición swap de 8 GiB. El HDD conserva particiones NTFS para los archivos existentes. Las capacidades comerciales de los discos se expresan en GB, mientras que Linux puede mostrarlas en GiB.

Para una instalación nueva resulta más sencillo dedicar un disco Linux al sistema y a los datos de aplicaciones. Si conservas NTFS para compartir archivos con Windows, revisa montaje, propietario y permisos. Las bases de datos y los datos que requieren permisos POSIX deben permanecer en un sistema de archivos adecuado, como ext4.

## RAM y servicios bajo demanda

Ocho gigabytes permiten un laboratorio útil si se controla qué corre simultáneamente. SonarQube, Paperless-ngx y otras herramientas pesadas se encienden cuando hacen falta. Los detalles están en [servicios](servicios.md).

La swap ayuda ante picos. Si el equipo intercambia memoria constantemente, puede responder con lentitud. Observa RAM, swap y carga antes de añadir aplicaciones.

## Qué revisar al reutilizar un portátil

Comprueba el estado de discos, batería, cargador, ventilación y temperatura. Ajusta la suspensión y el comportamiento al cerrar la tapa para el uso que quieras dar al servidor. Una conexión Ethernet, si está disponible, simplifica la estabilidad de red.

Antes de instalar Debian identifica cada disco y guarda una copia de tus datos. Elige el particionado para tu equipo. Si hay Windows y NTFS compartido, evita escribir en una partición que quedó hibernada.

## Crecer según la necesidad

El disco de respaldo está en el mismo equipo. La copia externa protege frente a pérdidas que afecten a ambos discos.

La elección de hardware depende de las aplicaciones. Puedes comenzar con un PC usado, Debian, Tailscale y dos o tres contenedores; ampliar RAM o separar máquinas después tiene más sentido cuando sabes qué recurso falta.
