import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';

function PageLoading() {
  const systemLoading = useSelector(state => state.system.loading);

  return systemLoading === true ? (
    <Box
      sx={{
        position: 'absolute',
        width: '100vw',
        top: '0',
        left: '0',
        zIndex: 100
      }}
    >
      <LinearProgress color="thirdly" />
    </Box>
  ) : (
    <></>
  );
}

export default PageLoading;
