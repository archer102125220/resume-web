import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { firebaseAdminAsyncThunk } from '@/redux/firebaseAdmin';
import buttonStyle from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import TokenDataView from '@/components/FirebaseAdmin/TokenDataView';

function FirebaseAdmin() {
  const [appMessageToken, setAppMessageToken] = useState('1');
  const [appMessage, setAppMessage] = useState('appMessage');
  const appMessageTokens = useSelector(
    ({ firebaseAdmin }) => firebaseAdmin.appMessageTokens || []
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
  const POST_AndroidPushNotification = useCallback(
    data => {
      return dispatch(
        firebaseAdminAsyncThunk.POST_AndroidPushNotification({
          loading: boloean => SAVE_loading(boloean),
          payload: {
            token: tokenFilter('android'),
            data
          }
        })
      );
    },
    [dispatch, appMessageTokens]
  );
  const POST_IosPushNotification = useCallback(
    data => {
      return dispatch(
        firebaseAdminAsyncThunk.POST_IosPushNotification({
          loading: boloean => SAVE_loading(boloean),
          payload: {
            token: tokenFilter('ios'),
            data
          }
        })
      );
    },
    [dispatch, appMessageTokens]
  );
  const POST_WebPushMessage = useCallback(
    data => {
      return dispatch(
        firebaseAdminAsyncThunk.POST_WebPushMessage({
          loading: boloean => SAVE_loading(boloean),
          payload: {
            token: tokenFilter('web'),
            data
          }
        })
      );
    },
    [dispatch, appMessageTokens]
  );

  useEffect(() => {
    GET_GetMessageTokens();
  }, []);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/firebase-admin' });

  function tokenFilter(filterOs) {
    return appMessageTokens
      .filter(({ os }) => os === filterOs)
      .map(({ token }) => token);
  }
  function registerMessageToken() {
    POST_RegisterMessageToken(appMessageToken);
  }
  function pushNotification() {
    POST_PushNotification(appMessage);
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - FirebaseAdmin</title>
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
      <TokenDataView
        defaultAppMessage="AndroidAppMessage"
        title="Android Message Tokens"
        messageTitle="Android推播訊息"
        appMessageTokens={appMessageTokens.filter(({ os }) => os === 'android')}
        pushNotification={POST_AndroidPushNotification}
      />
      <TokenDataView
        defaultAppMessage="IosAppMessage"
        title="Ios Message Tokens"
        messageTitle="Ios推播訊息"
        appMessageTokens={appMessageTokens.filter(({ os }) => os === 'ios')}
        pushNotification={POST_IosPushNotification}
      />
      <TokenDataView
        defaultAppMessage="WebAppMessage"
        title="Web Message Tokens"
        messageTitle="Web推播訊息"
        appMessageTokens={appMessageTokens.filter(({ os }) => os === 'web')}
        pushNotification={POST_WebPushMessage}
      />
    </div>
  );
}

export default FirebaseAdmin;
