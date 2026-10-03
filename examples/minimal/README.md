# Ejemplo mínimo: Uptime Kuma

Un primer servicio de disponibilidad con persistencia. Requiere Docker Engine y Compose. No instala el homelab completo.

Ejecuta los comandos con un usuario autorizado para Docker o añade `sudo` a los comandos `docker` si tu instalación lo requiere.

```bash
cp .env.example .env
docker compose config --quiet
docker compose up -d
docker compose ps
```

El puerto se publica en `127.0.0.1` del servidor. Desde otro ordenador usa tu propio usuario y destino SSH:

```bash
ssh -N -L 3001:127.0.0.1:3001 usuario@servidor
```

Abre `http://127.0.0.1:3001` en el cliente, con el túnel activo. Crea tus propias credenciales. La imagen predeterminada es una etiqueta observada el 3 de octubre de 2026; consulta el [proyecto oficial](https://github.com/louislam/uptime-kuma) antes de cambiarla.

Los datos están en el volumen `kuma-data`. `docker compose stop` detiene el servicio y conserva sus datos. No borres el volumen si quieres conservar la configuración.

La sintaxis del ejemplo se validó con Compose; no se desplegó como parte de la creación de esta documentación. Sigue la [guía](../../docs/replicar.md) para diseñar acceso, alertas y respaldos propios.
