import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import RegisterForm from '../account/RegisterForm';
import { Tab, Tabs } from '@mui/material';
import LoginForm from '../account/LoginForm';
import { TabContext, TabPanel } from '@mui/lab';
import { theme } from '../../app/common/themes/theme';
import { useStore } from '../../app/stores/store';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export default observer(function HomePage() {
    const [value, setValue] = useState("1");
    const { userStore } = useStore();
    const location = useLocation();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    if (userStore.isLoggedIn) {
        return <Navigate to={`profile/${userStore.currentUser?.username}`} state={{from: location}} />
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <TabContext value={value}>
                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <Tabs value={value} onChange={handleChange} centered>
                                <Tab label="Log In" value="1" />
                                <Tab label="Sign Up" value="2" />
                            </Tabs>
                        </Box>
                        <TabPanel value='1'><LoginForm setValue={setValue} /></TabPanel>
                        <TabPanel value='2'><RegisterForm setValue={setValue} /></TabPanel>
                    </TabContext>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
})