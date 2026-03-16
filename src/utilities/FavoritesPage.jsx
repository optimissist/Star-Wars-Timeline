function FavoritesPage({characterFavorites, starshipFavorites, planetFavorites}) {
    return (
        <div>
            <h1>My Favorites</h1>
            <h3>Favorite Characters</h3>
            {characterFavorites.length > 0 
            ? characterFavorites.map(name => <p key={name}>{name}</p>)
            : <p>No favorites yet!</p> }
            <h3>Favorite Starships</h3>
            {starshipFavorites.length > 0 
            ? starshipFavorites.map(name => <p key={name}>{name}</p>)
            : <p>No favorites yet!</p> }
            <h3>Favorite Planets</h3>
            {planetFavorites.length > 0 
            ? planetFavorites.map(name => <p key={name}>{name}</p>)
            : <p>No favorites yet!</p> }
        </div>
    )
}

export default FavoritesPage;