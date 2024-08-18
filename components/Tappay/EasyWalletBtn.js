import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import Image from '@/components/Image';

const styles = {
  easyWalletBtn: {
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

function EasyWalletBtn(props) {
  const { disabled, onClick, className, ...ortherProps } = props;
  const classes = useStyles();

  return (
    <Button
      color="white"
      disabled={disabled}
      variant="contained"
      className={[classes.easyWalletBtn, className].join(' ')}
      onClick={onClick}
      {...ortherProps}
    >
      <Image
        src="/img/tappay/easy_wallet_btn.png"
        alt="easy_wallet_btn"
        width={100}
        height={40}
      />
    </Button>
  );
}

EasyWalletBtn.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

EasyWalletBtn.defaultProps = {
  disabled: false,
  className: ''
};

export default EasyWalletBtn;
