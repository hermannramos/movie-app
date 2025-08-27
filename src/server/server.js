/* eslint-disable no-undef */
import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());
const port = Number(process.env.PORT) || 5180;

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

app.get("/api/movies/now_playing", async (request, response) => {
    try{
        const requestedLimit = Number(request.query.limit) || 5;
        const safeLimit = Math.max(1, Math.min(50, requestedLimit));

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

app.get("/api/movies/genres", async ( request, response) => {
    try {
        const uri = "https://api.themoviedb.org/3/discover/movie?with_genres=28&language=es-ES&sort_by=popularity.desc&page=1";
        const tmdbResponse = await fetch (uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            }
        });
        const data =  await tmdbResponse.json();
        const genresList = Array.isArray(data?.genres) ? data.genres : [];

        response.status(tmdbResponse.ok ? 200 : tmdbResponse.status).json({genres: genresList});
    } catch (error){
        console.error("TMDB request failed:", error);
        response.status(500).json({error: "TMDB request failed"});
    }
});

app.get('/api/movies/by-genre/:genreId', async (request, response) => {
  try {
    const { genreId } = request.params;
    const requestedLimit = Number(request.query.limit) || 12;
    const safeLimit = Math.max(1, Math.min(50, requestedLimit));
    const searchParams = new URLSearchParams({
      with_genres: String(genreId),
      sort_by: 'popularity.desc',
      page: '1'
    });

    const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?${searchParams.toString()}`;
    const tmdbResponse = await fetch(tmdbUrl, {
      headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` }
    });
    
    const tmdbData = await tmdbResponse.json();
    const results = Array.isArray(tmdbData?.results) ? tmdbData.results.slice(0, safeLimit) : [];

    response.status(tmdbResponse.ok ? 200 : tmdbResponse.status).json({results, page: tmdbData.page, total_pages: tmdbData.total_pages, total_results: tmdbData.total_results, genreId});
  } catch (error) {
    console.error('TMDB request failed:', error);
    response.status(500).json({ error: 'TMDB request failed' });
  }
});

app.use((error, _request, response) => {
    console.error('[error]', error);
    response.status(500).json({error: 'Unexpected error'});
});

app.listen(port, () => {
    console.log(`[server] http://localhost:${port}`);
});