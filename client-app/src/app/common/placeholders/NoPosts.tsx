import { Box, Card, CardContent, ThemeProvider, Typography } from "@mui/material";
import NoPhoto from "../../../assets/nophoto.png"
import { theme } from "../themes/theme";

interface Props {
    height?: string;
}

export default function NoPosts() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                mt: "5vh",
                mb: "5vh",
                textAlign: "center"
            }}>
                <img style={{ width: "20%" }} src={NoPhoto} />
                <Typography fontSize="30pt">No posts</Typography>
            </Box>
        </ThemeProvider>
    );
}