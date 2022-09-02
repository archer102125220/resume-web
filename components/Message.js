import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Message({ messageState, anchorOrigin, autoHideDuration, width }) {
  const [open, setOpen] = useState(false);
  const { text = '', type = '' } = messageState || {};
  const handleOpen = () => {
    if (type === '') return;
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  useEffect(handleOpen, [messageState]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={type || 'success'} sx={{ width }}>
        {text}
      </MuiAlert>
    </Snackbar>
  );
}

Message.propTypes = {
  messageState: PropTypes.object,
  anchorOrigin: PropTypes.object,
  autoHideDuration: PropTypes.number,
  width: PropTypes.string
};

Message.defaultProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
  autoHideDuration: 6000,
  width: '100%'
};