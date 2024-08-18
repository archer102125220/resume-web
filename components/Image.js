import NextImage from 'next/image';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';

const styles = {
  img: {
    transition: 'opacity 0.5s'
  },
  imgBeforeLoad: {
    opacity: 0
  },
  imgLoaded: {
    opacity: 1
  }
};

const useStyles = makeStyles(styles);

export function Image(props) {
  const classes = useStyles(props);

  const [loaded, setLoaded] = useState(false);

  return (
    <NextImage
      {...props}
      className={[
        classes.img,
        loaded === true ? classes.imgLoaded : classes.imgBeforeLoad,
        props.className
      ].join(' ')}
      onLoad={() => {
        setLoaded(false);
      }}
      onLoadingComplete={() => {
        setLoaded(true);
      }}
    />
  );
}

Image.propTypes = {
  className: PropTypes.string
};

Image.defaultProps = {
  className: ''
};

export default Image;
