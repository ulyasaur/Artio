import { observer } from "mobx-react-lite";
import { Outlet, ScrollRestoration } from "react-router-dom";
import NavBar from "./NavBar";
import "../../index.css"

function App() {
    return (
        <>
            <ScrollRestoration />
            <NavBar />
            <Outlet />
        </>
    );
}

export default observer(App);