import PropTypes from 'prop-types';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const styles = {
  atomeBtn: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    height: '40px',
    '& img': {
      width: '75px',
      height: 'auto'
    }
  }
};

const useStyles = makeStyles(styles);

function AtomeBtn(props) {
  const { disabled, onClick, className, ...ortherProps } = props;
  const classes = useStyles();

  return (
    <Button
      disabled={disabled}
      variant="contained"
      className={[classes.atomeBtn, className].join(' ')}
      onClick={onClick}
      {...ortherProps}
    >
      <Image
        src="/img/tappay/atome_btn.png"
        alt="atome_btn"
        width={100}
        height={40}
      />
    </Button>
  );
}

AtomeBtn.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

AtomeBtn.defaultProps = {
  disabled: false,
  className: ''
};

export default AtomeBtn;
