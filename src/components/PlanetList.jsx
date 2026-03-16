import LoadingSpinner from "./utilities/LoadingSpinner";
import PlanetCard from "./PlanetCard";

function PlanetList({planets, isLoading, favorites, onToggleFavorite}) {
    return (
        <div>
            {isLoading && <LoadingSpinner />}
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