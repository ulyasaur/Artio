import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface Props {
    content?: string;
}

export default function LoadingComponent({content}: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
      <Typography>
        {content || "Loading app..."}
      </Typography>
    </Box>
  );
}