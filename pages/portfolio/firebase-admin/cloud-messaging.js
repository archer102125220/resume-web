import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { firebaseAdminAsyncThunk } from '@/redux/firebaseAdmin';
import buttonStyle from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import TokenDataView from '@/components/Firebase/TokenDataView';

function FirebaseCloudMessaging() {
  const [appMessageToken, setAppMessageToken] = useState('');
  const [appMessage, setAppMessage] = useState('appMessage');
  const [appMessageTokenError, setAppMessageTokenError] = useState(false);
  const appMessageTokens = useSelector(
    ({ firebaseAdmin }) => firebaseAdmin.appMessageTokens || []
  );
  const dispatch = useDispatch();
  const SAVE_loading = useCallback(
    loading => dispatch({ type: 'system/SAVE_loading', payload: loading }),
    [dispatch]
  );
  const informationMessage = useCallback(
    payload => {
      return dispatch({ type: 'system/message_information', payload });
    },
    [dispatch]
  );
  const successMessage = useCallback(
    payload => {
      return dispatch({ type: 'system/message_success', payload });
    },
    [dispatch]
  );
  const errorMessage = useCallback(
    payload => {
      return dispatch({ type: 'system/message_error', payload });
    },
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
    ({ token, callback = GET_GetMessageTokens } = {}) => {
      return dispatch(
        firebaseAdminAsyncThunk.POST_RegisterMessageToken({
          loading: boloean => SAVE_loading(boloean),
          payload: { token },
          callback
        })
      );
    },
    [dispatch]
  );
  const POST_PushNotification = useCallback(
    ({ data, callback } = {}) => {
      return dispatch(
        firebaseAdminAsyncThunk.POST_PushNotification({
          loading: boloean => SAVE_loading(boloean),
          payload: { data },
          callback
        })
      );
    },
    [dispatch]
  );
  const POST_AndroidPushNotification = useCallback(
    ({ data, callback } = {}) => {
      return dispatch(
        firebaseAdminAsyncThunk.POST_AndroidPushNotification({
          loading: boloean => SAVE_loading(boloean),
          payload: {
            token: tokenFilter('android'),
            data
          },
          callback
        })
      );
    },
    [dispatch, appMessageTokens]
  );
  const POST_IosPushNotification = useCallback(
    ({ data, callback } = {}) => {
      return dispatch(
        firebaseAdminAsyncThunk.POST_IosPushNotification({
          loading: boloean => SAVE_loading(boloean),
          payload: {
            token: tokenFilter('ios'),
            data
          },
          callback
        })
      );
    },
    [dispatch, appMessageTokens]
  );
  const POST_WebPushMessage = useCallback(
    ({ data, callback } = {}) => {
      return dispatch(
        firebaseAdminAsyncThunk.POST_WebPushMessage({
          loading: boloean => SAVE_loading(boloean),
          payload: {
            token: tokenFilter('web'),
            data
          },
          callback
        })
      );
    },
    [dispatch, appMessageTokens]
  );

  useEffect(() => {
    GET_GetMessageTokens();
  }, []);

  useGTMTrack({
    event: 'scnOpen',
    url: '/portfolio/firebase-admin/cloud-messaging'
  });

  function handleSetAppMessageToken(e) {
    setAppMessageToken(e.target.value);
    setAppMessageTokenError(false);
  }

  function tokenFilter(filterOs) {
    return appMessageTokens
      .filter(({ os }) => os === filterOs)
      .map(({ token }) => token);
  }
  function registerMessageToken() {
    if (typeof `${appMessageToken}` !== 'string' || appMessageToken === '') {
      errorMessage('請輸入有效token!');
      setAppMessageTokenError(true);
      return;
    }
    POST_RegisterMessageToken({
      token: appMessageToken,
      callback: () => {
        GET_GetMessageTokens();
        successMessage('註冊token成功！');
      }
    });
  }
  function pushNotification() {
    POST_PushNotification({
      data: appMessage,
      callback: ({ failureCount = 0, successCount = 0 } = {}) => {
        informationMessage(
          `執行完畢，成功向${successCount}份裝置發送推播訊息，${failureCount}份裝置發送失敗`
        );
      }
    });
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - FirebaseCloudMessaging</title>
      </Head>
      <Box>
        <Image
          style={{
            margin: 'auto',
            display: 'block',
            maxWidth: '300px'
          }}
          src="/img/firebase/firebase-cloud-messaging.png"
          alt="Firebase Logo"
          width={200}
          height={200}
        />
      </Box>
      <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
        <Grid xs={6} md={8}>
          <TextField
            label="推播Token"
            variant="filled"
            fullWidth
            error={appMessageTokenError}
            value={appMessageToken}
            onChange={handleSetAppMessageToken}
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
        platform="web"
        messageTitle="Web推播訊息"
        title="Web Message Tokens"
        defaultAppMessage="WebAppMessage"
        pushNotification={POST_WebPushMessage}
        appMessageTokens={appMessageTokens.filter(({ os }) => os === 'web')}
      />
      <TokenDataView
        platform="android"
        messageTitle="Android推播訊息"
        title="Android Message Tokens"
        defaultAppMessage="AndroidAppMessage"
        pushNotification={POST_AndroidPushNotification}
        appMessageTokens={appMessageTokens.filter(({ os }) => os === 'android')}
      />
      <TokenDataView
        platform="ios"
        messageTitle="Ios推播訊息"
        title="Ios Message Tokens"
        defaultAppMessage="IosAppMessage"
        pushNotification={POST_IosPushNotification}
        appMessageTokens={appMessageTokens.filter(({ os }) => os === 'ios')}
      />
    </div>
  );
}

export default FirebaseCloudMessaging;
