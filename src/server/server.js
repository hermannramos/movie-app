/* eslint-disable no-undef */
import 'dotenv/config';
import express from 'express';
import fs from "fs";
import path from "path";


const app = express();
const port = Number(process.env.PORT) || 5180;
app.use(express.json());

app.get("/api/search", async (request, response) => {
    try{
        const searchQuery = (request.query.q || "").toString().trim();
        if(!searchQuery) return response.json({ results: [] });

        const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&language=es-ES&page=1`;
        const searchResponse = await fetch(searchUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            },
        });

        const searchData = await searchResponse.json();
        const limitedResults = Array.isArray(searchData.results) ? searchData.results.slice(0, 8) : [];

        response.status(searchResponse.ok ? 200 : searchResponse.status).json({ results: limitedResults });
    } catch (error){
        console.error("TMDB search error:", error);
        response.status(500).json({ error: "TMDB request failed" });
    }
});

app.get("/api/movies/popular", async (request, response) => {
    try{
        const requestedLimit = Number(request.query.limit) || 10;
        const safeLimit = Math.max(1, Math.min(50, requestedLimit));

        const tmdbUrl = "https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1";
        const tmdbResponse = await fetch(tmdbUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            }
        });
        const tmdbData = await tmdbResponse.json();

        const allMovies = Array.isArray(tmdbData?.results) ? tmdbData.results : [];
        const limitedMovies = allMovies.slice(0, safeLimit);

        const payload = {...tmdbData, results: limitedMovies};
        response.status(tmdbResponse.ok ? 200 : tmdbResponse.status).json(payload);
    } catch (error){
        console.error("TMDB request failed:", error);
        response.status(500).json({error: "TMDB request failed"});
    }
});

app.get("/api/movies/top_rated", async (request, response) => {
    try{
        const requestedLimit = Number(request.query.limit) || 10;
        const safeLimit = Math.max(1, Math.min(50, requestedLimit));

        const tmdbUrl = "https://api.themoviedb.org/3/movie/top_rated?language=es-ES&page=1";
        const tmdbResponse = await fetch(tmdbUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            }
        });
        const tmdbData = await tmdbResponse.json();

        const allMovies = Array.isArray(tmdbData?.results) ? tmdbData.results : [];
        const limitedMovies = allMovies.slice(0, safeLimit);

        const payload = {...tmdbData, results: limitedMovies};
        response.status(tmdbResponse.ok ? 200 : tmdbResponse.status).json(payload);
    } catch (error){
        console.error("TMDB request failed:", error);
        response.status(500).json({error: "TMDB request failed"});
    }
});

app.get("/api/movies/now_playing", async (request, response) => {
    try{
        const requestedLimit = Number(request.query.limit) || 5;
        const safeLimit = Math.max(1, Math.min(25, requestedLimit));

        const tmdbUrl = "https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1"
        const tmdbResponse = await fetch(tmdbUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            }
        });
        const tmdbData = await tmdbResponse.json();

        const allMovies = Array.isArray(tmdbData?.results) ? tmdbData.results : [];
        const limitedMovies = allMovies.slice(0, safeLimit);

        const payload = {...tmdbData, results: limitedMovies};
        response.status(tmdbResponse.ok ? 200 : tmdbResponse.status).json(payload);
    } catch(error){
        console.error("TMDB request failed:", error);
        response.status(500).json({error: "TMDB request failed"});
    }
});

app.get("/api/movies/:movieId", async(request, response) => {
    try{
        const { movieId } = request.params;
        const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=es-ES`;
        const movieResponse = await fetch(movieUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            }
        });
        const movieData = await movieResponse.json();
        response.status(movieResponse.ok ? 200 : movieResponse.status).json(movieData);
    } catch(error){
        console.error("TMDB request failed:", error);
        response.status(500).json({error: "TMDB request failed"});
    }
});

app.get("/api/movies/:movieId/credits", async(request, response) => {
    try{
        const { movieId } = request.params;
        const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=es-ES`;
        const creditsResponse = await fetch(creditsUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            },
        });
        const creditsData = await creditsResponse.json();
        response.status(creditsResponse.ok ? 200 : creditsResponse.status).json(creditsData);
    } catch (error){
        console.error("TMDB request failed:", error);
        response.status(500).json({error: "TMDB request failed"});
    }
});

const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);

  app.get('*all', async (request, response) => {
    try {
      const url = request.originalUrl;
      let template = await fs.promises.readFile(path.resolve('index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule('/src/ssr/entry-server.jsx');
      const { html } = await render(url);

      const htmlOut = template.replace('<!--app-html-->', html);
      response.status(200).set({ 'Content-Type': 'text/html' }).end(htmlOut);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      console.error(error);
      res.status(500).end(error.stack || String(error));
    }
  });
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;

  app.use(compression());
  app.use(sirv('dist/client', { extensions: [] }));

  const template = fs.readFileSync('dist/client/index.html', 'utf-8');
  const { render } = await import(path.resolve('dist/server/entry-server.js'));

  app.get('*all', async (request, response) => {
    try {
      const { html } = await render(request.originalUrl);
      const htmlOut = template.replace('<!--app-html-->', html);
      response.status(200).set({ 'Content-Type': 'text/html' }).end(htmlOut);
    } catch (error) {
      console.error(error);
      response.status(500).end(error.stack || String(error));
    }
  });
};

/* eslint-disable-next-line no-unused-vars */
app.use((error, _request, response, _next) => {
    console.error('[error]', error);
    response.status(500).json({error: 'Unexpected error'});
});

app.listen(port, () => {
    console.log(`[server] http://localhost:${port}`);
});