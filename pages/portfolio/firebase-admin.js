import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
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
import useGTMTrack from '@/hooks/useGTMTrack';

function FirebaseAdmin() {
  const [appMessageToken, setAppMessageToken] = useState('1');
  const [appMessage, setAppMessage] = useState('appMessage');
  const appMessageTokens = useSelector(
    ({ firebaseAdmin }) => firebaseAdmin.appMessageTokens
  );
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
  const POST_RegisterMessageToken = useCallback(
    token => {
      return dispatch(
        firebaseAdminAsyncThunk.POST_RegisterMessageToken({
          loading: boloean => SAVE_loading(boloean),
          payload: { token },
          callback: GET_GetMessageTokens
        })
      );
    },
    [dispatch]
  );
  const POST_PushNotification = useCallback(
    data => {
      return dispatch(
        firebaseAdminAsyncThunk.POST_PushNotification({
          loading: boloean => SAVE_loading(boloean),
          payload: { data }
        })
      );
    },
    [dispatch]
  );
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

  useEffect(() => {
    GET_GetMessageTokens();
  }, []);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/firebase-admin' });

  function registerMessageToken() {
    POST_RegisterMessageToken({ token: appMessageToken });
  }
  function pushNotification() {
    POST_PushNotification(appMessage);
  }
  function cancelMessageToken(cancelToken) {
    console.log({ cancelToken });
    DELETE_CancelMessageToken(cancelToken);
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的個人資料 - FirebaseAdmin</title>
      </Head>
      <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
        <Grid xs={6} md={8}>
          <TextField
            label="推播Token"
            variant="filled"
            fullWidth
            value={appMessageToken}
            onChange={e => setAppMessageToken(e.target.value)}
          />
        </Grid>
        <Grid xs={6} md={4}>
          <Button
            sx={{ ...buttonStyle, width: '100%' }}
            variant="contained"
            onClick={registerMessageToken}
          >
            <p>向推播伺服器註冊</p>
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
        <Grid xs={6} md={8}>
          <TextField
            label="推播訊息"
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
            onClick={pushNotification}
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
            App Message Tokens
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
              sx={{ maxWidth: '80%', overflow: 'scroll' }}
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

export default FirebaseAdmin;
