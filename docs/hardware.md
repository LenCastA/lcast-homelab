# Hardware y almacenamiento

LCast utiliza un Lenovo IdeaPad 330-15ARR que ya estaba disponible. Debian 13 está instalado directamente en el equipo. La CPU es un Ryzen 7 2700U de cuatro núcleos y ocho hilos; la RAM instalada es de 8 GB.

## Cómo se reparten los discos

| Disco | Capacidad comercial | Uso en el laboratorio |
| --- | --- | --- |
| SSD Kingston A400 | 960 GB | Debian, Docker, bases de datos y persistencias activas |
| HDD Seagate | 2 TB | Documentos, archivos compartidos y repositorio de respaldo local |

El equipo conserva particiones de otros usos. Por eso la capacidad total del SSD no equivale al espacio asignado a Debian. La instalación observada usa ext4 para la raíz de Debian, una partición swap de 8 GiB y particiones NTFS en el HDD para los archivos existentes.

No necesitas repetir ese particionado. Para una instalación nueva resulta más sencillo dedicar un disco Linux al sistema y a los datos de aplicaciones. Si se conserva NTFS para compartir archivos con Windows, hay que revisar montaje, propietario y permisos. Las bases de datos y la persistencia que necesita permisos POSIX deben permanecer en un sistema de archivos adecuado como ext4.

## RAM y servicios bajo demanda

Ocho gigabytes permiten un laboratorio útil si se controla qué corre simultáneamente. SonarQube, Paperless-ngx y otras herramientas pesadas se encienden cuando hacen falta. Los detalles están en [servicios](servicios.md).

La swap ayuda ante picos, pero no sustituye la RAM. Una máquina que intercambia memoria constantemente puede responder mal aunque sus contenedores sigan encendidos. Conviene observar RAM, swap y carga antes de añadir aplicaciones.

## Qué revisar al reutilizar un portátil

Comprueba el estado de discos, batería, cargador, ventilación y temperatura. Ajusta la suspensión y el comportamiento al cerrar la tapa para el uso que quieras dar al servidor. Una conexión Ethernet, si está disponible, simplifica la estabilidad de red.

Antes de instalar Debian identifica cada disco y guarda una copia de lo importante. No apliques el esquema de particiones de otro equipo sobre tus datos. Si hay Windows y NTFS compartido, evita montar para escritura una partición que quedó hibernada.

## Límites del equipo

Es un nodo doméstico. No se ha verificado una configuración RAID, una UPS, una medición de consumo ni un mecanismo de conmutación a otro servidor. El disco de respaldo está en el mismo equipo, así que la copia externa es necesaria para cubrir pérdidas que afecten a ambos discos.

La elección de hardware depende de las aplicaciones. Puedes comenzar con un PC usado, Debian, Tailscale y dos o tres contenedores; ampliar RAM o separar máquinas después tiene más sentido cuando sabes qué recurso falta.
