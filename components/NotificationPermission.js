import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import {
  requestPermission,
  firebaseMessagingInit
} from '@/utils/firebase.client';
import { buttonStyle, buttonLayout } from '@/styles/buttonStyle';

const styles = {
  notificationPermission: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  }
};

const useStyles = makeStyles(styles);

function NotificationPermission({ anchorOrigin }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleOpen();
  }, []);

  const classes = useStyles();

  async function handleOpen() {
    const _open = await requestPermission();
    setOpen(_open !== true);
  }
  function handleClose() {
    setOpen(false);
  }
  async function handleFirebaseMessagingInit() {
    const result = await requestPermission();
    if (result === true) {
      await firebaseMessagingInit();
    }
    handleClose();
  }

  return (
    <Snackbar open={open} anchorOrigin={anchorOrigin}>
      <SnackbarContent
        message="這是一個啟用推播功能的詢問，目前仍在構想如不同意的情況，應於何處更改，所以每次都會做詢問"
        action={
          <div className={classes.notificationPermission}>
            <Button
              sx={buttonStyle}
              variant="contained"
              size="small"
              onClick={handleFirebaseMessagingInit}
            >
              啟用
            </Button>
            <Button
              sx={buttonLayout}
              color="error"
              variant="contained"
              size="small"
              onClick={handleClose}
            >
              不啟用
            </Button>
          </div>
        }
      />
    </Snackbar>
  );
}

NotificationPermission.propTypes = {
  anchorOrigin: PropTypes.object
};

NotificationPermission.defaultProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'center' }
};

export default NotificationPermission;
