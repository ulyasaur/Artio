import { ThemeProvider } from "@emotion/react";
import { Link as RouterLink } from "react-router-dom";
import { theme } from "../../app/common/themes/theme";
import NotFoundRobot from '../../assets/not-found.jpg';
import { Button, Card, CardContent, Grid, Link, Typography } from "@mui/material";

export default function NotFound() {
    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    height: "89vh"
                }}>
                <CardContent>
                    <Grid container >
                        <Grid xs={6}>
                            <img src={NotFoundRobot} alt="not-found" style={{ width: "100%", height: "auto" }} />
                        </Grid>
                        <Grid xs={6}
                            sx={{
                                display: "flex",
                                verticalAlign: "middle"
                            }}>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontSize: "20pt",
                                    fontWeight: "bold",
                                    marginTop: "auto",
                                    marginBottom: "auto"
                                }}>
                                Oops - we've looked everywhere but could not find what you are looking for!
                                <Link
                                    style={{
                                        textDecoration: "none"
                                    }}
                                    component={RouterLink} to="/">
                                    <Button
                                        variant="contained"
                                        sx={{
                                            fontSize: "12pt"
                                        }}
                                    >
                                        Return to home page
                                    </Button>
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </ThemeProvider >

    );
}