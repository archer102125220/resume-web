import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import {
  requestPermission,
  firebaseMessagingInit
} from '@/utils/firebase.client';
import { buttonStyle, buttonLayout } from '@/styles/buttonStyle';

const styles = {
  notificationPermission: {
    display: 'flex',
    padding: '2rem 0'
  }
};

const useStyles = makeStyles(styles);

function NotificationPermission({ anchorOrigin }) {
  const [open, setOpen] = useState(false);

  useEffect(handleOpen, []);

  const classes = useStyles();

  function handleOpen() {
    setOpen(requestPermission() !== true);
  }
  function handleClose() {
    setOpen(false);
  }
  async function handleFirebaseMessagingInit() {
    await firebaseMessagingInit();
    handleClose();
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={anchorOrigin}
      action={
        <div className={classes.notificationPermission}>
          <p>
            這是一個啟用推播功能的詢問，目前仍在構想如不同意的情況，應於何處更改，所以每次都會做詢問
          </p>
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
  );
}

NotificationPermission.propTypes = {
  anchorOrigin: PropTypes.object
};

NotificationPermission.defaultProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'center' }
};

export default NotificationPermission;
