import {useNavigate} from "react-router-dom";

function EpisodeTimeline({films, selectedId}) {
    const toRoman = n => ['I','II','III','IV','V','VI'][n - 1];
    const navigate = useNavigate();

    return (
        <div>
             {
             films.map(
                film => 
                    <button 
                    key={film.episode_id} 
                    type="button" 
                    onClick={() => navigate(`/episode/${film.episode_id}/characters`)} 
                    style={{ color: film.episode_id === selectedId ? "blue" : "inherit" }}>
                        Episode {toRoman(film.episode_id)}
                    </button>
            )}
        </div>
    )
}

export default EpisodeTimeline;