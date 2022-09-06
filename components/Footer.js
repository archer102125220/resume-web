// import PropTypes from 'prop-types';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';

const styles = {
  footer: {
    display: 'flex',
    flex: '1',
    padding: '2rem 0',
    borderTop: '1px solid #eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: '1em',
    marginLeft: '0.5rem'
  }
};

const useStyles = makeStyles(styles);

function Footer(props) {
  const classes = useStyles(props);

  const classNameFooter = classes.footer;
  // const classNameFooter = '';

  return (
    <footer className={classNameFooter}>
      Powered by{' '}
      <span className={classes.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </footer>
  );
}

Footer.propTypes = {};

export default Footer;