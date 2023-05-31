import PropTypes from 'prop-types';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const styles = {
  plusPayBtn: {
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

function PlusPayBtn(props) {
  const { disabled, onClick, className, ...ortherProps } = props;
  const classes = useStyles();

  return (
    <Button
      disabled={disabled}
      variant="contained"
      className={[classes.plusPayBtn, className].join(' ')}
      onClick={onClick}
      {...ortherProps}
    >
      <Image
        src="/img/tappay/plus_pay_btn.png"
        alt="plus_pay_btn"
        width={100}
        height={40}
      />
    </Button>
  );
}

PlusPayBtn.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

PlusPayBtn.defaultProps = {
  disabled: false,
  className: ''
};

export default PlusPayBtn;
