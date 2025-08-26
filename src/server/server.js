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

app.use((error, _request, response) => {
    console.error('[error]', error);
    response.status(500).json({error: 'Unexpected error'});
});

app.listen(port, () => {
    console.log(`[server] http://localhost:${port}`);
});