import { Outlet } from "react-router-dom"
import Nav from "./Nav"

const Maincontainer = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    )
}

export default Maincontainer