import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { firebaseAdminAsyncThunk } from '@/redux/firebaseAdmin';
import buttonStyle from '@/styles/buttonStyle';

function TokenDataView({
  defaultAppMessage,
  title,
  messageTitle,
  appMessageTokens,
  pushNotification
}) {
  const [appMessage, setAppMessage] = useState(defaultAppMessage);
  const dispatch = useDispatch();
  const SAVE_loading = useCallback(
    loading => dispatch({ type: 'system/SAVE_loading', payload: loading }),
    [dispatch]
  );
  const GET_GetMessageTokens = useCallback(() => {
    return dispatch(
      firebaseAdminAsyncThunk.GET_GetMessageTokens({
        loading: boloean => SAVE_loading(boloean)
      })
    );
  }, [dispatch]);
  const DELETE_CancelMessageToken = useCallback(
    token => {
      return dispatch(
        firebaseAdminAsyncThunk.DELETE_CancelMessageToken({
          loading: boloean => SAVE_loading(boloean),
          payload: token,
          callback: GET_GetMessageTokens
        })
      );
    },
    [dispatch]
  );

  function cancelMessageToken(cancelToken) {
    console.log({ cancelToken });
    DELETE_CancelMessageToken(cancelToken);
  }

  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: '10px', marginBottom: '10px' }}
      >
        <Grid xs={6} md={8}>
          <TextField
            label={messageTitle}
            variant="filled"
            fullWidth
            value={appMessage}
            onChange={e => setAppMessage(e.target.value)}
          />
        </Grid>
        <Grid xs={6} md={4}>
          <Button
            sx={{ ...buttonStyle, width: '100%' }}
            variant="contained"
            onClick={(...e) => pushNotification(appMessage, ...e)}
          >
            <p>發送推播訊息</p>
          </Button>
        </Grid>
      </Grid>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {title}
          </ListSubheader>
        }
      >
        {appMessageTokens.length <= 0 ? (
          <ListItem>
            <ListItemText primary="查無列表" />
          </ListItem>
        ) : (
          <></>
        )}
        {appMessageTokens.map((appMessageToken, index) => (
          <ListItem key={index}>
            <ListItemText
              sx={{ maxWidth: '80%', overflow: 'auto' }}
              primary={appMessageToken.token}
            />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => cancelMessageToken(appMessageToken.token)}
            >
              <DeleteIcon color="#808080" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

TokenDataView.propTypes = {
  defaultAppMessage: PropTypes.string,
  appMessageTokens: PropTypes.array,
  title: PropTypes.string,
  messageTitle: PropTypes.string,
  pushNotification: PropTypes.func
};

TokenDataView.defaultProps = {
  defaultAppMessage: 'appMessage',
  appMessageTokens: [],
  title: 'App Message Tokens',
  messageTitle: '推播訊息',
  pushNotification: appMessage => appMessage
};

export default TokenDataView;
