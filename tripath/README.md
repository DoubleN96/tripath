# Tripath.es

Tripath.es es una plataforma de alquiler de habitaciones que conecta a propietarios con inquilinos.

## Características

- Búsqueda de habitaciones por ubicación, fechas y número de huéspedes
- Visualización detallada de habitaciones con fotos y características
- Sistema de reservas
- Autenticación de usuarios
- Panel de administración para propietarios

## Requisitos

- Node.js 18 o superior
- PostgreSQL 12 o superior
- npm o yarn

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/tripath.git
cd tripath
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```
Edita el archivo `.env` con tus credenciales de base de datos y otras configuraciones.

4. Inicializa la base de datos:
```bash
npx prisma migrate dev
```

5. Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Estructura del proyecto

```
tripath/
├── app/                # Directorio principal de la aplicación
│   ├── api/           # Rutas de la API
│   ├── components/    # Componentes reutilizables
│   └── lib/           # Utilidades y configuraciones
├── prisma/            # Esquema y migraciones de la base de datos
├── public/            # Archivos estáticos
└── styles/            # Estilos globales
```

## Tecnologías utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- NextAuth.js

## Contribución

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
