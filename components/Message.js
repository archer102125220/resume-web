import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Message({
  messageState = { text: '', type: 'success' },
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
  autoHideDuration = 6000,
  width = '100%',
  resetMessageState = () => {}
}) {
  const [open, setOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    const { text: _text = '', type: _type = 'success' } = messageState || {};
    setMessageText(_text);
    setMessageType(_type || 'success');
    if (_text !== '' && _type !== '') {
      setOpen(true);
    }
  }, [messageState]);

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setTimeout(() => resetMessageState(), 80);
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={messageType}
        sx={{ width }}
      >
        {messageText}
      </MuiAlert>
    </Snackbar>
  );
}

Message.propTypes = {
  messageState: PropTypes.object,
  anchorOrigin: PropTypes.object,
  autoHideDuration: PropTypes.number,
  width: PropTypes.string,
  resetMessageState: PropTypes.func
};

// Message.defaultProps = {
//   messageState: { text: '', type: 'success' },
//   anchorOrigin: { vertical: 'top', horizontal: 'center' },
//   autoHideDuration: 6000,
//   width: '100%',
//   resetMessageState() {}
// };

export default Message;
