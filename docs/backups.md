# Backups y recuperación

El respaldo sigue cuatro pasos: preparar los datos de cada aplicación, crear snapshots cifrados con Kopia en el HDD, copiar el repositorio a Google Drive con Rclone y comunicar el resultado a Healthchecks.io.

## Qué se respalda

Las fuentes seleccionadas incluyen configuración del sistema, definiciones de servicios, proyectos y copias preparadas de aplicaciones. Los documentos, videos y archivos personales del HDD se protegen cuando se añaden expresamente a ese inventario.

Al replicarlo, decide qué datos debes conservar. Prioriza documentos y bases de datos frente a elementos regenerables, como imágenes de contenedores o una web compilada.

## Preparar una copia coherente

La preparación depende de cada servicio y de su versión:

- **PostgreSQL:** generar un dump con las herramientas compatibles de la base y comprobar que el artefacto puede leerse.
- **SQLite:** usar su mecanismo de backup cuando permita una copia coherente en funcionamiento y validar la integridad.
- **Paperless-ngx:** usar el exportador oficial y respaldar la base según la versión y el despliegue utilizados.
- **Otros datos con escrituras:** detener temporalmente el servicio cuando necesite una copia en frío.

Copiar los archivos de una base activa mientras escribe puede producir un respaldo inconsistente. Los scripts preparan copias para Kopia y devuelven los servicios bajo demanda al estado que tenían antes. Para ampliar el ejemplo mínimo, prepara este procedimiento por aplicación.

## Copia local y externa

Kopia guarda snapshots cifrados en el HDD. Rclone utiliza `copy` para llevar el repositorio a Google Drive, añadiendo o actualizando archivos sin borrar los del destino.

Custodia la contraseña de Kopia fuera del servidor, por ejemplo en un gestor de contraseñas. La necesitas para recuperar las copias. Los backups también pueden contener credenciales y configuración privada, así que deben mantenerse protegidos.

Un timer persistente programa la ejecución y recupera una tarea pendiente al arrancar. El equipo necesita conectividad y tiempo para completar la copia externa. Consulta la [operación del servidor](operacion.md).

## Cómo comprobar el resultado

Comprueba la preparación de aplicaciones, los snapshots, la copia remota y el cierre enviado a Healthchecks.io. Después restaura una muestra en otro directorio para verificar que puedes usarla.

## Recuperar sin perder el estado actual

1. Identificar qué se perdió y qué snapshot o artefacto corresponde.
2. Recuperar primero a un directorio temporal e inspeccionar su contenido.
3. Conservar el estado actual y detener solo el servicio afectado.
4. Restaurar con el mecanismo de la aplicación: dump, backup SQLite, exportación o copia en frío.
5. Verificar permisos, configuración, arranque, datos y acceso.
6. Crear una nueva copia cuando el servicio vuelva a estar estable.

Define retención, espacio disponible, coste remoto y pérdida de datos tolerable. Consulta la [guía de réplica](replicar.md) y las [referencias oficiales](recursos.md) para adaptar el procedimiento.
