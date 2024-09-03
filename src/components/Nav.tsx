import { NavLink } from "react-router-dom"


const Nav = () => {
    return (
        <div className="space-x-4 m-4 text-xl font-bold">
            <NavLink className={({ isActive }) => isActive ? "text-red-600" : "text-black"} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-red-600" : "text-black"} to="/traditional">Traditonal</NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-red-600" : "text-black"} to="/rq">RQ</NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-red-600" : "text-black"} to="/fruits">Pagination</NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-red-600" : "text-black"} to="/infiniteQueries">Infinity Scroll</NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-red-600" : "text-black"} to="/load_on_scroll">Load on Scroll</NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-red-600" : "text-black"} to="/form">Mutation</NavLink>
        </div>
    )
}

export default Nav