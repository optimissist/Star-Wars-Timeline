import { NavLink, useParams } from 'react-router-dom';
import Switch from "./Switch";

function NavBar() {
    const { episodeId } = useParams();
    const id = episodeId || '1';

    return (
    <nav>
        <p><Switch /> Light Side or Dark Side?</p>
       <NavLink to={`/episode/${id}/characters`}
         style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
            Characters
        </NavLink>
         <NavLink to={`/episode/${id}/starships`}
         style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
            Starships
        </NavLink>
         <NavLink to={`/episode/${id}/planets`}
         style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
            Planets
        </NavLink>
        <NavLink to='/favorites'>Favorites ❤️</NavLink>
    </nav>

  );
}



export default NavBar;