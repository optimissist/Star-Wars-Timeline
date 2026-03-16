function FilmCard({film}) {
    return (
        <div>
            <h2>Episode {film.episode_id}, {film.title}</h2>
            <p>{film.director}, {film.release_date}</p>
            <p>{film.opening_crawl.slice(0, 300)}</p>
        </div>
    )
}

export default FilmCard;