# 🎬 Movie App

Modern web application to explore popular, top-rated, and upcoming movies.  
Built with **React, Redux Toolkit, SCSS, Express, Vite SSR Support, and TMDB API**.

## ✨ Features

- 🔍 **Real-time movie search** with interactive dropdown.  
- ❤️ **Wishlist** with dynamic heart icon (lights up in red when adding).  
- 🖼️ **Banner slider** with smooth animations and modern gradient.  
- 🏆 **Top Rated Movies** with Netflix-style design (ranking numbers behind posters).  
- 👤 **Movie details view** with synopsis, cast, director, producer, and more.  
- 🎨 **Responsive design** with modern fonts (*Montserrat* + *Inter*) and a **dark gradient background**.  
- ⚡ **Full SSR Support**: pages are rendered on the server first for faster load and SEO-friendly content.  

## 🖼️ Screenshots
<p align="center">
  <img src="./src/assets/Movie-App-Home.png" alt="Movie App Home" height="400" />
  <img src="./src/assets/Movie-App-details.png" alt="Movie App Details" height="400" />
</p>

## 🚀 Tech Stack

- ⚛️ React + Vite (with **SSR setup**)  
- 📦 Redux Toolkit  
- 🎨 SCSS  
- 🖥️ Express.js (Node server with SSR + TMDB API proxy)  
- 🎥 [TMDB API](https://www.themoviedb.org/documentation/api)  
- 🎨 Icons: [Lucide React](https://lucide.dev/)  

## ⚡ Installation & Usage

```bash
# Clone repository
git clone https://github.com/yourusername/movie-app.git
cd movie-app

# Install dependencies
npm install

# Run in development (SSR + Express + client)
npm run dev

# Build for production
npm run build

# Preview production build (SSR + Express)
npm run preview

