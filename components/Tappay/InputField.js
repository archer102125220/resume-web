import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import { makeStyles } from '@mui/styles';

const styles = {
  tappayInputField: {
    height: '56px',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: '16.5px 14px'
  }
};

const useStyles = makeStyles(styles);

const TappayInputField = forwardRef(function InputField(props, ref) {
  const { label, labelClassName, inputClassName, inputStatusClassName } = props;

  const classes = useStyles();

  return (
    <>
      <InputLabel className={[labelClassName, inputStatusClassName].join(' ')}>
        {label}
      </InputLabel>
      <div
        className={[
          classes.tappayInputField,
          inputClassName,
          inputStatusClassName
        ].join(' ')}
        ref={ref}
      />
    </>
  );
});

TappayInputField.propTypes = {
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  inputStatusClassName: PropTypes.string
};

TappayInputField.defaultProps = {
  label: '',
  labelClassName: '',
  inputClassName: '',
  inputStatusClassName: ''
};

export default TappayInputField;
