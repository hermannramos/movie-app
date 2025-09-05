# 🎬 Movie App

Aplicación web moderna para explorar películas populares, mejor valoradas y próximas a estrenarse.  
Desarrollada con **React, Redux Toolkit, SCSS, Express y TMDB API**.

## ✨ Características

- 🔍 **Buscador en tiempo real** de películas con dropdown interactivo.  
- ❤️ **Wishlist** con icono de corazón dinámico (se ilumina en rojo al añadir).  
- 🖼️ **Slider de banners** con animaciones y degradado moderno.  
- 🏆 **Top Rated Movies** con diseño estilo Netflix (ranking numérico detrás de los pósters).  
- 👤 **Vista de detalles** con sinopsis, reparto, director, productor y más.  
- 🎨 **Diseño responsive** con tipografías modernas (*Montserrat* + *Inter*) y un **fondo oscuro degradado**.  

## 🖼️ Capturas de Pantalla
<p align="center">
  <img src="./src/assets/Movie-App-Home.png" alt="Movie App Home" height="400" />
  <img src="./src/assets/Movie-App-details.png" alt="Movie App Details" height="400" />
</p>

## 🚀 Tecnologías

- ⚛️ React + Vite  
- 📦 Redux Toolkit  
- 🎨 SCSS  
- 🖥️ Express.js (servidor Node con proxy a la API de TMDB)  
- 🎥 [TMDB API](https://www.themoviedb.org/documentation/api)  
- 🎨 Iconos: [Lucide React](https://lucide.dev/)  

## ⚡ Instalación y uso

```bash
# Clonar repositorio
git clone https://github.com/tuusuario/movie-app.git
cd movie-app

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (cliente + servidor Express)
npm run dev

# Build para producción
npm run build
