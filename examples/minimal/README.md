# Ejemplo mínimo: Uptime Kuma

Un primer servicio de disponibilidad con persistencia. Requiere Docker Engine y Compose.

Revisa `KUMA_IMAGE` en `.env.example`. Ejecuta los comandos con un usuario autorizado para Docker o añade `sudo` a los comandos `docker`.

```bash
cp .env.example .env
docker compose config --quiet
docker compose up -d
docker compose ps
```

El puerto se publica en `127.0.0.1` del servidor. Desde otro ordenador abre un túnel SSH con tu usuario y el nombre o dirección privada de tu equipo:

```bash
ssh -N -L 3001:127.0.0.1:3001 usuario@servidor
```

Abre `http://127.0.0.1:3001` en el cliente, con el túnel activo, y crea tus credenciales. Consulta el [proyecto oficial](https://github.com/louislam/uptime-kuma) para elegir y actualizar la imagen.

Los datos están en el volumen `kuma-data`. `docker compose stop` detiene el servicio y conserva la configuración. Borrar ese volumen elimina los datos.

Continúa con la [guía de réplica](../../docs/replicar.md) para configurar alertas y respaldos.
