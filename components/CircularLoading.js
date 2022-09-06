import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

function CircularLoading({ style, size }) {

  return <Box sx={{ position: 'relative', ...style }}>
    <CircularProgress
      variant="determinate"
      sx={{
        color: (theme) =>
          theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
      }}
      size={size}
      thickness={4}
      value={100}
    />
    <CircularProgress
      variant="indeterminate"
      sx={{
        stroke: 'currentcolor',
        strokeDasharray: '80px, 200px',
        strokeDashoffset: 0,
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: 'round',
        },
      }}
      size={size}
      thickness={4}
    />
  </Box>;
}

CircularLoading.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CircularLoading.defaultProps = {
  size: 40
};

export default CircularLoading;