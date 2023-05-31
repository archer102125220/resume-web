import PropTypes from 'prop-types';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const styles = {
  jkoPayBtn: {
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

function JkoPayBtn(props) {
  const { disabled, onClick, className, ...ortherProps } = props;
  const classes = useStyles();

  return (
    <Button
      disabled={disabled}
      variant="contained"
      className={[classes.jkoPayBtn, className].join(' ')}
      onClick={onClick}
      {...ortherProps}
    >
      <Image
        src="/img/tappay/jko_pay_btn.png"
        alt="jko_pay_btn"
        width={100}
        height={40}
      />
    </Button>
  );
}

JkoPayBtn.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

JkoPayBtn.defaultProps = {
  disabled: false,
  className: ''
};

export default JkoPayBtn;
