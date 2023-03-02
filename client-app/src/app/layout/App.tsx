import { observer } from "mobx-react-lite";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import "../../index.css"
import { Container } from "@mui/material";
import HomePage from "../../features/home/HomePage";

function App() {
    const location = useLocation();

    return (
        <>
            <ScrollRestoration />
            {location.pathname === '/' ? <HomePage /> : (
                <>
                    <NavBar />
                    <Container style={{ paddingTop: "73px" }}>
                        <Outlet />
                    </Container>
                </>
            )
            }
        </>
    );
}

export default observer(App);