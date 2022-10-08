import PropTypes from 'prop-types';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';

const styles = {
  footer: {
    display: 'flex',
    flex: '1',
    // padding: '2rem 0',
    padding: ({ footerPadding }) => footerPadding,
    borderTop: '1px solid #eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // height: '1em',
    height: ({ logoHeight }) => logoHeight,
    marginLeft: '0.5rem'
  }
};

const useStyles = makeStyles(styles);

function Footer(props) {
  const classes = useStyles(props);

  return (
    <footer className={classes.footer}>
      Powered by{' '}
      <span className={classes.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </footer>
  );
}

Footer.propTypes = {
  logoHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  footerPadding: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

Footer.defaultProps = {
  footerPadding: '2rem 0',
  logoHeight: '1em'
};


export default Footer;