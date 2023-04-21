import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses
} from '@mui/material/CircularProgress';

function CircularLoading({ style, size, loading }) {
  return loading === true ? (
    <Box sx={{ position: 'relative', ...style }}>
      <CircularProgress
        variant="determinate"
        // sx={{
        //   // color: '#f1948db8'
        //   color: theme =>
        //     theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
        // }}
        size={size}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        sx={{
          color: '#1a90ff',
          stroke: 'currentcolor',
          strokeDasharray: '80px, 200px',
          strokeDashoffset: 0,
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round'
          }
        }}
        size={size}
        thickness={4}
      />
    </Box>
  ) : (
    <></>
  );
}

CircularLoading.propTypes = {
  style: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool
};

CircularLoading.defaultProps = {
  size: 40,
  loading: false
};

export default CircularLoading;
