# Operación y mantenimiento

Antes de investigar un fallo, comprueba que Debian está iniciado, que existe conexión y que el servicio debería estar encendido. La lista de [servicios](servicios.md) distingue los residentes de los que se usan bajo demanda.

## Una rutina sencilla

Homepage reúne accesos y métricas rápidas. Cockpit y Portainer permiten revisar sistema y contenedores. OliveTin ofrece acciones delimitadas para consultar estado o controlar aplicaciones. Cada resultado debe contrastarse con los registros del componente correspondiente.

OCR, análisis de código, escaneos y compilaciones compiten por la memoria. Conviene ejecutar una carga exigente a la vez y detenerla al terminar. Un servicio bajo demanda apagado tiene un estado esperado.

## Actualizaciones controladas

DIUN observa cambios en registros de imágenes. Renovate propone cambios de dependencias. El actualizador aplica una política común:

1. Identificar el estado anterior (**BASE**) y el estado propuesto (**TARGET**), manteniendo ambas referencias durante toda la ronda.
2. Revisar el lote y completar el backup del estado anterior antes de desplegar TARGET. Si el backup falla, detener la aplicación de cambios.
3. Descargar y desplegar las imágenes aprobadas de los servicios afectados.
4. Comprobar ejecución, salud y respuesta cuando corresponda. Conservar el estado anterior de los servicios bajo demanda, incluidos los que estaban apagados.
5. Generar un informe operativo y programar Trivy de forma asíncrona.

Las actualizaciones de parche, menores y de digest pueden automatizarse. Los cambios mayores requieren revisión manual de compatibilidad y migraciones.

## Monitoreo y alertas

Uptime Kuma vigila disponibilidad, Beszel muestra métricas y `smartd` supervisa discos. Scrutiny conserva tendencias y se consulta bajo demanda. NetAlertX aporta visibilidad de la red. Los eventos llegan a ntfy y un relay envía una copia por correo. Un heartbeat externo ayuda a detectar la ausencia del servidor cuando sus herramientas locales tampoco pueden avisar.

Trivy produce un informe de vulnerabilidades separado del informe operativo. Sus hallazgos ayudan a priorizar revisiones y actualizaciones. La [recuperación de backups](backups.md) se comprueba restaurando una muestra.

Consulta la [arquitectura](arquitectura.md) y la [guía de réplica](replicar.md) antes de adaptar este modelo a otro equipo.
