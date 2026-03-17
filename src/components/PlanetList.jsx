import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import LoadingSpinner from "../utilities/LoadingSpinner";
import ErrorMessage from "../utilities/ErrorMessage";
import PlanetCard from "./PlanetCard";

function PlanetList({films, favorites, onToggleFavorite}) {
    const [planets, setPlanets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { episodeId } = useParams();

    useEffect(() => {
        if (films.length === 0) return;
            const fetchPlanets = async () => {
                setIsLoading(true);
                    try {
                        const film = films.find(f => f.episode_id === Number(episodeId));
                        const results = await Promise.all(
                            film.planets.map(url => fetch(url).then(r => r.json()))
                        );
                        setPlanets(results);
                    } catch (err) {
                        setError(err.message);
                    } finally {
                        setIsLoading(false);
                    }
                };
            fetchPlanets();
}, [episodeId, films]);


    return (
        <div>
            {isLoading && <LoadingSpinner />}
            {error != null && <ErrorMessage message={error} /> }
             {planets.map(planet => 
            <PlanetCard 
            key={planet.url}
            planet={planet}
            isFavorite={favorites.includes(planet.name)}
            onToggleFavorite={onToggleFavorite}/>
            )}
            {planets.length === 0 && "No planets found"}
        </div>
    )
}

export default PlanetList;