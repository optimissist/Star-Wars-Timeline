import LoadingSpinner from "./utilities/LoadingSpinner";
import StarshipCard from "./StarshipCard";

function StarshipList({starships, isLoading, favorites, onToggleFavorite}) {
    return (
        <div>
            {isLoading && <LoadingSpinner />}
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