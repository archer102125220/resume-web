import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import Image from '@/components/Image';

const styles = {
  applePayBtn: {
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
        src={
          disabled === true
            ? '/img/tappay/apple_pay_disabled_btn.png'
            : '/img/tappay/apple_pay_btn.png'
        }
        alt="apple_pay_btn"
        width={100}
        height={40}
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
