import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import LoadingSpinner from "../utilities/LoadingSpinner";
import ErrorMessage from "../utilities/ErrorMessage";
import CharacterCard from "./CharacterCard";

function CharacterList({films, favorites, onToggleFavorite}) {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { episodeId } = useParams();

    useEffect(() => {
        if (films.length === 0) return;
            const fetchCharacters = async () => {
                setIsLoading(true);
                    try {
                        const film = films.find(f => f.episode_id === Number(episodeId));
                        const results = await Promise.all(
                            film.characters.map(url => fetch(url).then(r => r.json()))
                        );
                        setCharacters(results);
                    } catch (err) {
                        setError(err.message);
                    } finally {
                        setIsLoading(false);
                    }
                };
            fetchCharacters();
}, [episodeId, films]);


    return (
        <div>
            {isLoading && <LoadingSpinner />}
            {error != null && <ErrorMessage message={error} /> }
            {characters.map(character => 
            <CharacterCard 
            key={character.url}
            character={character}
            isFavorite={favorites.includes(character.name)}
            onToggleFavorite={onToggleFavorite}/>
            )}
            {characters.length === 0 && "No characters found"}
        </div>
    )
}

export default CharacterList;