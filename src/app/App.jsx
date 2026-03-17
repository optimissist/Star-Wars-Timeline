import {useState, useEffect} from "react";
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import {useTheme} from "./ThemeContext";

import NavBar from "../utilities/NavBar";
import ErrorMessage from "../utilities/ErrorMessage";
import LoadingSpinner from "../utilities/LoadingSpinner";
import FavoritesPage from "../utilities/FavoritesPage";
import EpisodeTimeline from "../components/EpisodeTimeline";
import FilmCard from "../components/FilmCard";
import CharacterList from "../components/CharacterList";
import StarshipList from "../components/StarshipList";
import PlanetList from "../components/PlanetList";


const getFavorites = (key) => JSON.parse(localStorage.getItem(key)) || [];

function EpisodeView({ films }) {
  const { episodeId } = useParams();
  const film = films.find(f => f.episode_id === Number(episodeId));
  return (
    <>
      <EpisodeTimeline films={films} selectedId={Number(episodeId)} />
      {film && <FilmCard film={film} />}
    </>
  );
}

function App() {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [characterFavorites, setCharacterFavorites] = useState(() => getFavorites("characterFavorites"));
  const [starshipFavorites, setStarshipFavorites] = useState(() => getFavorites("starshipFavorites"));
  const [planetFavorites, setPlanetFavorites] = useState(() => getFavorites("planetFavorites"));

  const {theme} = useTheme();

  const fetchFilms = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://swapi.dev/api/films/');
      if (!res.ok) throw new Error('Failed to fetch films');
      const data = await res.json();
      setFilms(data.results.sort((a, b) => a.episode_id - b.episode_id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchFilms(); }, []);


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

useEffect(() => {
    document.body.style.backgroundColor = theme === "dark" ? "#242424" : "#ffffff";
}, [theme]);


  return (
    <div className={theme}>
      <h1>Star Wars Saga Timeline</h1>
      
      <NavBar />
      
      {isLoading && <LoadingSpinner />}
      
      {error != null && <ErrorMessage message={error} /> }

    <Routes>
      <Route path='/' element={<Navigate to='/episode/1/characters' />} />
      <Route path='/episode/:episodeId' element={<Navigate to='characters' replace />} />
      <Route path='/episode/:episodeId/characters' element={
        <>
          <EpisodeView films={films} />
          <CharacterList films={films} favorites={characterFavorites} onToggleFavorite={toggleCharacterFavorite} />
        </>
           } />

      <Route path='/episode/:episodeId/starships' element={
        <>
          <EpisodeView films={films} />
          <StarshipList films={films} favorites={starshipFavorites} onToggleFavorite={toggleStarshipFavorite} />
        </>
        } />
      <Route path='/episode/:episodeId/planets' element={
        <>
          <EpisodeView films={films} />
         <PlanetList films={films} favorites={planetFavorites} onToggleFavorite={togglePlanetFavorite} />
        </>
    } />
      <Route path='/favorites' element={
        <FavoritesPage characterFavorites={characterFavorites} starshipFavorites={starshipFavorites} planetFavorites={planetFavorites} />} />
    </Routes>

    </div>
  )
}

export default App;