import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import LoadingSpinner from "../utilities/LoadingSpinner";
import ErrorMessage from "../utilities/ErrorMessage";
import StarshipCard from "./StarshipCard";

function StarshipList({films, favorites, onToggleFavorite}) {
    const [starships, setStarships] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { episodeId } = useParams();

    useEffect(() => {
        if (films.length === 0) return;
            const fetchStarships = async () => {
                setIsLoading(true);
                    try {
                        const film = films.find(f => f.episode_id === Number(episodeId));
                        const results = await Promise.all(
                            film.starships.map(url => fetch(url).then(r => r.json()))
                        );
                        setStarships(results);
                    } catch (err) {
                        setError(err.message);
                    } finally {
                        setIsLoading(false);
                    }
                };
            fetchStarships();
}, [episodeId, films]);


    return (
        <div>
            {isLoading && <LoadingSpinner />}
            {error != null && <ErrorMessage message={error} /> }
             {starships.map(starship => 
            <StarshipCard 
            key={starship.url}
            starship={starship}
            isFavorite={favorites.includes(starship.name)}
            onToggleFavorite={onToggleFavorite}/>
            )}
            {starships.length === 0 && "No starships found"}
        </div>
    )
}

export default StarshipList;