import PropTypes from 'prop-types';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const styles = {
  applePayBtn: {
    display: 'flex',
    alignItems: 'center',
    width: '20%',
    height: '40px',
    margin: 'auto',
    '& img': {
      width: '100%',
      height: '100%'
    }
  }
};

const useStyles = makeStyles(styles);

function ApplePayBtn(props) {
  const { disabled, onClick, className, ...ortherProps } = props;
  const classes = useStyles();

  return (
    <Button
      color="white"
      disabled={disabled}
      variant="contained"
      className={[classes.applePayBtn, className].join(' ')}
      onClick={onClick}
      {...ortherProps}
    >
      <Image
        src="/img/tappay/apple_pay_btn.png"
        alt="apple_pay_btn"
        width={200}
        height={200}
      />
    </Button>
  );
}

ApplePayBtn.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

ApplePayBtn.defaultProps = {
  disabled: false,
  className: ''
};

export default ApplePayBtn;
