function StarshipCard({starship, isFavorite, onToggleFavorite}) {
    return (
        <div>
            <h3>{starship.name}, {starship.model}</h3>
            <h5>{starship.manufacturer}, {starship.starship_class}</h5>
            <p>{starship.crew}</p>
            <button type="button" onClick={onToggleFavorite}>{isFavorite ? "❤️" : "♡" } </button>
        </div>
    )
}

export default StarshipCard;