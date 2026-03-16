function StarshipCard({starship}) {
    return (
        <div>
            <h3>{starship.name}, {starship.model}</h3>
            <h5>{starship.manufacturer}, {starship.starship_class}</h5>
            <p>{starship.crew}</p>
        </div>
    )
}
// name, model, manufacturer, starship_class, crew

export default StarshipCard;