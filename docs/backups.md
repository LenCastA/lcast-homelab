# Backups y recuperación

El respaldo del homelab sigue una cadena: preparar datos coherentes de cada aplicación, crear snapshots cifrados con Kopia en el HDD local, copiar ese repositorio a Google Drive con Rclone y comunicar el resultado a Healthchecks.io. Cada paso tiene una función. Una copia de la configuración ayuda a reconstruir servicios, pero una base de datos necesita un procedimiento que conserve su consistencia.

## Qué se respalda

La cobertura selecciona configuración del sistema, definiciones de servicios, proyectos y artefactos preparados de aplicaciones. Las fuentes se revisan expresamente, en lugar de asumir que todo lo que existe en el servidor entra en la copia.

Esto no equivale a respaldar automáticamente todos los documentos, videos o archivos compartidos del HDD. Quien replique el sistema debe decidir qué datos personales quiere proteger y añadirlos a su inventario. También conviene separar lo regenerable, como imágenes de contenedores y una web compilada, de lo irremplazable, como documentos y bases de datos.

## Preparar una copia coherente

La preparación depende de cada servicio y de su versión:

- **PostgreSQL:** generar un dump con las herramientas compatibles de la base y comprobar que el artefacto puede leerse.
- **SQLite:** usar su mecanismo de backup cuando permita una copia coherente en funcionamiento y validar la integridad.
- **Paperless-ngx:** usar el exportador oficial y respaldar la base según la versión y el despliegue utilizados.
- **Otros datos con escrituras:** detener temporalmente el servicio cuando necesite una copia en frío.

Copiar sin más los archivos de una base activa puede producir un respaldo inconsistente. Los helpers preparan artefactos que Kopia puede guardar y procuran devolver los servicios bajo demanda al estado que tenían antes. El backup no debería dejar una aplicación pesada encendida por accidente.

Esos scripts pertenecen a la instalación descrita. El ejemplo mínimo de este repositorio no incluye esa automatización: debes preparar tu propio procedimiento de backup por aplicación.

## Copia local y externa

Kopia guarda snapshots cifrados en el HDD. Rclone utiliza `copy` para llevar el repositorio a Google Drive. Ese flujo no utiliza `sync`. La copia externa permite recuperar información aunque se pierda el repositorio local, siempre que haya terminado correctamente y se conserve la contraseña de cifrado.

Esa contraseña debe custodiarse por separado, en un gestor de contraseñas o mediante otro mecanismo de recuperación seguro. Guardarla únicamente en el mismo servidor que podría perderse dejaría incompleta la estrategia. Los backups pueden contener configuración y credenciales privadas, por eso tampoco deben publicarse.

La ejecución se programa con un timer persistente. Si el equipo estaba apagado, puede recuperar una ejecución pendiente al arrancar. Aun así, necesita conectividad y tiempo suficiente para completar la copia externa. Su disponibilidad se relaciona con la [operación del servidor](operacion.md).

## Cómo comprobar el resultado

La revisión debe cubrir la preparación de aplicaciones, los snapshots, la copia remota y el cierre enviado a Healthchecks.io. Un resultado correcto de Kopia local no demuestra que Google Drive haya recibido todo.

En la comprobación del **3 de octubre de 2026**, el último trabajo registrado terminó con `Result=success` y código de salida `0`. Es evidencia de ejecución correcta; no demuestra una restauración completa ensayada. Aquí no se presentan tiempos medidos de recuperación, objetivos garantizados RPO/RTO ni una certificación de estrategia 3-2-1.

## Recuperar sin perder el estado actual

1. Identificar qué se perdió y qué snapshot o artefacto corresponde.
2. Recuperar primero a un directorio temporal e inspeccionar su contenido.
3. Conservar el estado actual y detener solo el servicio afectado.
4. Restaurar con el mecanismo de la aplicación: dump, backup SQLite, exportación o copia en frío.
5. Verificar permisos, configuración, arranque, datos y acceso.
6. Crear una nueva copia cuando el servicio vuelva a estar estable.

Antes de adoptar el sistema, definir retención, espacio disponible, coste remoto y pérdida de datos tolerable. Ensayar una restauración pequeña ayuda a comprobar esas decisiones. Consulta la [guía de replicación](replicar.md) y las [referencias oficiales](recursos.md) para adaptar el procedimiento.
