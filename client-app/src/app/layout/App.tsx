import { observer } from "mobx-react-lite";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import "../../index.css"
import { Container } from "@mui/material";
import HomePage from "../../features/home/HomePage";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const location = useLocation();
    const { userStore } = useStore();
    const [appLoaded, setAppLoaded] = useState(false);

    useEffect(() => {
      if (userStore.token) {
        userStore.getUser().finally(() => setAppLoaded(true));
      } else {
        setAppLoaded(true);
      }
    }, [userStore, appLoaded])
  
    if (!appLoaded) {
      return <LoadingComponent />
    }
    
    return (
        <>
            <ScrollRestoration />
            <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
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