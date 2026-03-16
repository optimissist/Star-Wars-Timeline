import LoadingSpinner from "./utilities/LoadingSpinner";
import CharacterCard from "./CharacterCard";

function CharacterList({characters, isLoading, favorites, onToggleFavorite}) {
    return (
        <div>
            {isLoading && <LoadingSpinner />}
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