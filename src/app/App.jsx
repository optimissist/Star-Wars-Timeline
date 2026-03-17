import {useState, useEffect} from "react";
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import {useTheme} from "./ThemeContext";

import NavBar from "../utilities/NavBar";
import ErrorMessage from "../utilities/ErrorMessage";
import LoadingSpinner from "../utilities/LoadingSpinner";
import EpisodeTimeline from "../components/EpisodeTimeline";
import FilmCard from "../components/FilmCard";
import CharacterList from "../components/CharacterList";
import StarshipList from "../components/StarshipList";
import PlanetList from "../components/PlanetList";


const getFavorites = (key) => JSON.parse(localStorage.getItem(key)) || [];

function App() {
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [starships, setStarships] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filmsLoading, setFilmsLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [characterFavorites, setCharacterFavorites] = useState(() => getFavorites("characterFavorites"));
  const [starshipFavorites, setStarshipFavorites] = useState(() => getFavorites("starshipFavorites"));
  const [planetFavorites, setPlanetFavorites] = useState(() => getFavorites("planetFavorites"));

  const {theme} = useTheme();

  const fetchFilms = async () => {
    setFilmsLoading(true);
    try {
      const res = await fetch('https://swapi.dev/api/films/');
      if (!res.ok) throw new Error('Failed to fetch films');
      const data = await res.json();
      setFilms(data.results.sort((a, b) => a.episode_id - b.episode_id));
    } catch (error) {
      setError(error.message);
    } finally {
      setFilmsLoading(false);
    }
  };

  useEffect(() => { fetchFilms(); }, []);
  
  const fetchEpisodeDetails = async () => {
    setDetailsLoading(true);
    
    const film = films.find(f => f.episode_id === Number(episodeId));
    
    try {
      const [characters, starships, planets] = await Promise.all([
        Promise.all(film.characters.map(url => fetch(url).then(r => r.json()))),
        Promise.all(film.starships.map(url => fetch(url).then(r => r.json()))),
        Promise.all(film.planets.map(url => fetch(url).then(r => r.json())))
      ]);

      setCharacters(characters);
      setStarships(starships);
      setPlanets(planets);
    } catch (error) {
      setError(error.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  useEffect(() => { if (films.length > 0) fetchEpisodeDetails(); }, [episodeId, films.length]);

  const toggleCharacterFavorite = (name) => {
  setCharacterFavorites(prev =>
    prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
  );
};

useEffect(() => {
  localStorage.setItem('characterFavorites', JSON.stringify(characterFavorites));
}, [characterFavorites]);


  function toggleStarshipFavorite(name) {
    setStarshipFavorites(prev =>
    prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
  );
  }

  useEffect(() => {
  localStorage.setItem('starshipFavorites', JSON.stringify(starshipFavorites));
}, [starshipFavorites]);


  function togglePlanetFavorite(name) {
    setPlanetFavorites(prev =>
    prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
  );
  }

    useEffect(() => {
  localStorage.setItem('planetFavorites', JSON.stringify(planetFavorites));
}, [planetFavorites]);


  return (
    <div className={theme}>
      <EpisodeTimeline films={films} selectedId={id} />
      <FilmCard film={selectedFilm} />
      <NavBar episodeId={episodeId} />

    <Routes>
      <Route path='/' element={<Navigate to='/episode/1/characters' />} />
      <Route path='/episode/:episodeId' element={<Navigate to='characters' replace />} />
      <Route path='/episode/:episodeId/characters' element={<CharacterList  />} />
      <Route path='/episode/:episodeId/starships' element={<StarshipList  />} />
      <Route path='/episode/:episodeId/planets' element={<PlanetList  />} />
      <Route path='/favorites' element={<FavoritesPage  />} />
    </Routes>

    </div>
  )
}

export default App;