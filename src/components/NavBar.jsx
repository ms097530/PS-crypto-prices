import { NavLink } from "react-router-dom"

export default function NavBar()
{
    return (
        <nav className="nav">
            <NavLink to='/'>HOME</NavLink>
            <NavLink to='/currencies'>CURRENCIES</NavLink>
            <NavLink to='/price'>PRICE</NavLink>
        </nav>
    )
}
