import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import { makeStyles } from '@mui/styles';

import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

const styles = theme => ({
  tappayInputField: {
    height: '56px',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: '16.5px 14px'
  },
  tappayInputFieldSuccess: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main
  },
  tappayInputFieldError: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main
  }
});

const useStyles = makeStyles(styles);

const TappayInputField = forwardRef(function InputField(props, ref) {
  const { label, labelClassName, inputClassName, error, success } = props;
  const [statusClassName, setStatusClassName] = useState('');

  const classes = useStyles();

  useIsomorphicLayoutEffect(() => {
    if (error === true) {
      setStatusClassName(classes.tappayInputFieldError);
    } else if (success === true) {
      setStatusClassName(classes.tappayInputFieldSuccess);
    } else {
      setStatusClassName('');
    }
  }, [error, success]);

  return (
    <>
      <InputLabel className={[labelClassName, statusClassName].join(' ')}>
        {label}
      </InputLabel>
      <div
        className={[
          classes.tappayInputField,
          inputClassName,
          statusClassName
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
  error: PropTypes.bool,
  success: PropTypes.bool
};

TappayInputField.defaultProps = {
  label: '',
  labelClassName: '',
  inputClassName: '',
  error: false,
  success: false
};

export default TappayInputField;
