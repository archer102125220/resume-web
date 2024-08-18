import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import Image from '@/components/Image';

const styles = {
  linePayBtn: {
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

function LinePayBtn(props) {
  const { disabled, onClick, className, ...ortherProps } = props;
  const classes = useStyles();

  return (
    <Button
      color="green"
      disabled={disabled}
      variant="contained"
      className={[classes.linePayBtn, className].join(' ')}
      onClick={onClick}
      {...ortherProps}
    >
      <Image
        src="/img/tappay/line_pay_h.png"
        alt="line_pay_h"
        width={100}
        height={40}
      />
    </Button>
  );
}

LinePayBtn.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

LinePayBtn.defaultProps = {
  disabled: false,
  className: ''
};

export default LinePayBtn;
