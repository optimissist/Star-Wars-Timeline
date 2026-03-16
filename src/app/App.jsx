import {useState} from "react";

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

  function fetchFilms() {
    
  }

  function fetchEpisodeDetails() {

  }

  function toggleFavorite() {

  }
  
  return (
    <div>

    </div>
  )
}

export default App;