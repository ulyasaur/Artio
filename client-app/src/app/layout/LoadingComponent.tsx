import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ThemeProvider, Typography } from '@mui/material';
import { theme } from '../common/themes/theme';

interface Props {
  content?: string;
}

export default function LoadingComponent({ content }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Box 
      sx={{ 
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        marginTop: "46vh"
    }}
      >
        <CircularProgress sx={{padding: "5px"}} />
        <Typography fontSize="14pt">
          {content || "Loading app..."}
        </Typography>
      </Box>
    </ThemeProvider>
  );
}