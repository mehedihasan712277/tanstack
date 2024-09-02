import { NavLink } from "react-router-dom"


const Nav = () => {
    return (
        <div className="space-x-4 m-4 text-xl font-bold">
            <NavLink className={({ isActive }) => isActive ? "text-red-600" : "text-black"} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-red-600" : "text-black"} to="/traditional">Traditonal</NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-red-600" : "text-black"} to="/rq">RQ</NavLink>
        </div>
    )
}

export default Nav