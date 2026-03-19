function PlanetCard({planet, isFavorite, onToggleFavorite}) {
    return (
        <div>
            <h3>{planet.name}</h3>
            <p>{planet.climate}</p>
            <p>{planet.terrain}</p>
            <p>{planet.population}</p>
            <button type="button" onClick={() => onToggleFavorite(planet.name)}>{isFavorite ? "❤️" : "♡" } </button>
        </div>
    )
}
export default PlanetCard;