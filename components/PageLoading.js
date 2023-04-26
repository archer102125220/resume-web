import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CircularLoading from '@/components/CircularLoading';

function PageLoading({ loading }) {
  return loading === true ? (
    <Box
      sx={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        top: '0',
        left: '0',
        zIndex: 100
        // backgroundColor: 'rgb(0 0 0 / 22%)'
      }}
    >
      <CircularLoading
        loading={true}
        style={{ width: '20vw', height: '20vw', top: 'calc(50% - 20vh)', left: 'calc(50% - 10vw)' }}
        size="100%"
      />
    </Box>
  ) : (
    <></>
  );
}

PageLoading.propTypes = {
  loading: PropTypes.bool
};

PageLoading.defaultProps = {
  loading: false
};

export default PageLoading;
