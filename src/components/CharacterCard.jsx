function CharacterCard({character, isFavorite, onToggleFavorite}) {
    return (
        <div>
            <h3>{character.name}</h3>
            <p>{character.birth_year}</p>
            <p>{character.height}</p>
            <p>{character.gender}</p>
            <button type="button" onClick={() => onToggleFavorite(character.name)}>{isFavorite ? "❤️" : "♡" } </button>
        </div>
    )
}

export default CharacterCard;