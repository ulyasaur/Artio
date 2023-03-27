import { Box, Card, CardContent, ThemeProvider, Typography } from "@mui/material";
import Nothing from "../../../assets/nothingfound.png"
import { theme } from "../themes/theme";

interface Props {
    height?: string;
}

export default function NothingFound() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                mt: "5vh",
                mb: "5vh",
                textAlign: "center"
            }}>
                <img style={{ width: "20%" }} src={Nothing} />
                <Typography fontSize="30pt">Nothing found</Typography>
            </Box>
        </ThemeProvider>
    );
}