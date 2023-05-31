import PropTypes from 'prop-types';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const styles = {
  piWalletBtn: {
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

function PiWalletBtn(props) {
  const { disabled, onClick, className, ...ortherProps } = props;
  const classes = useStyles();

  return (
    <Button
      color="blue"
      disabled={disabled}
      variant="contained"
      className={[classes.piWalletBtn, className].join(' ')}
      onClick={onClick}
      {...ortherProps}
    >
      <Image
        src={
          disabled === true
            ? '/img/tappay/pi_wallet_disabled_btn.png'
            : '/img/tappay/pi_wallet_btn.png'
        }
        alt="pi_wallet_btn"
        width={100}
        height={40}
      />
    </Button>
  );
}

PiWalletBtn.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

PiWalletBtn.defaultProps = {
  disabled: false,
  className: ''
};

export default PiWalletBtn;
