import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const styles = {
  hrComponents: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  hrComponentsLine: {
    flex: 1,
    height: '1px',
    border: '0px',
    borderTop: '1px solid #b3b3b3'
  },
  hrComponentsLabel: {}
};

const useStyles = makeStyles(styles);

function Hr(props) {
  const classes = useStyles(props);
  const { label } = props;

  return (
    <div
      {...props}
      className={[classes.hrComponents, props.className].join(' ')}
    >
      <hr className={classes.hrComponentsLine} />
      <p>{label}</p>
      <hr className={classes.hrComponentsLine} />
    </div>
  );
}

Hr.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string
};

Hr.defaultProps = {
  label: '',
  className: ''
};

export default Hr;
