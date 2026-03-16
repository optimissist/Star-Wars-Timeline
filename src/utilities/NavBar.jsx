import { NavLink } from 'react-router-dom';
import Switch from "./Switch";

function NavBar({episodeId}) {

    return (
    <div>
        <p><Switch /> Light Side or Dark Side?</p>
       <NavLink to={`/episode/${episodeId}/characters`}
         style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
            Characters
        </NavLink>
         <NavLink to={`/episode/${episodeId}/starships`}
         style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
            Starships
        </NavLink>
         <NavLink to={`/episode/${episodeId}/planets`}
         style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
            Planets
        </NavLink>
    </div>

  );
}



export default NavBar;