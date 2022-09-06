import Box from '@mui/material/Box';
import CircularLoading from '@/components/CircularLoading';

function PageLoading() {

  return <Box sx={{ position: 'absolute', width: '100vw', height: '100vh', top: '0', left: '0', backgroundColor: 'rgb(0 0 0 / 22%)' }}>
    <CircularLoading style={{ width: '20vw', height: '20vw', top: '10%', left: '40%' }} size='100%' />
    <Box sx={{
      position: 'relative',
      top: '15%',
      textAlign: 'center',
      fontSize: '50px',
      // color: 'primary.main'
    }}>
      Loading...
    </Box>
  </Box>;
}

export default PageLoading;