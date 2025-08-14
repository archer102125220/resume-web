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
import { buttonStyle, buttonLayout } from '@/styles/buttonStyle';

function TokenDataView({
  defaultAppMessage = 'appMessage',
  defaultMessageTitle = '推播訊息',
  defaultMessageImg = '/img/favicon/favicon.ico',
  title = 'App Message Tokens',
  appMessageTokens = [],
  pushNotification = appMessage => appMessage,
  platform = ''
}) {
  const [appMessage, setAppMessage] = useState(defaultAppMessage);
  const [appMessageTitle, setAppMessageTitle] = useState(defaultMessageTitle);
  const [appMessageImg, setAppMessageImg] = useState(defaultMessageImg);
  const dispatch = useDispatch();
  const SAVE_loading = useCallback(
    loading => dispatch({ type: 'system/SAVE_loading', payload: loading }),
    [dispatch]
  );
  const successMessage = useCallback(
    payload => {
      return dispatch({ type: 'system/message_success', payload });
    },
    [dispatch]
  );
  const informationMessage = useCallback(
    payload => {
      return dispatch({ type: 'system/message_information', payload });
    },
    [dispatch]
  );
  const warningMessage = useCallback(
    payload => {
      return dispatch({ type: 'system/message_warning', payload });
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
  const DELETE_CancelMessageToken = useCallback(
    ({ token, callback = GET_GetMessageTokens } = {}) => {
      return dispatch(
        firebaseAdminAsyncThunk.DELETE_CancelMessageToken({
          loading: boloean => SAVE_loading(boloean),
          payload: token,
          callback
        })
      );
    },
    [dispatch]
  );
  const DELETE_cancelAllMessageToken = useCallback(
    ({ _platform, callback = GET_GetMessageTokens } = {}) => {
      return dispatch(
        firebaseAdminAsyncThunk.DELETE_CancelAllMessageToken({
          loading: boloean => SAVE_loading(boloean),
          payload: _platform,
          callback
        })
      );
    },
    [dispatch]
  );

  function cancelMessageToken(cancelToken) {
    // console.log({ cancelToken });
    DELETE_CancelMessageToken({
      token: cancelToken,
      callback() {
        GET_GetMessageTokens();
        successMessage('移除token成功');
      }
    });
  }

  function cancelAllMessageToken(_platform) {
    // console.log({ _platform });
    DELETE_cancelAllMessageToken({
      _platform,
      callback() {
        GET_GetMessageTokens();
        successMessage('移除所有token成功');
      }
    });
  }

  function handlePushNotification() {
    if (appMessageTokens.length <= 0) {
      warningMessage(`尚無${platform}平台token`);
      return;
    }
    pushNotification({
      data: appMessage,
      title: appMessageTitle,
      img: appMessageImg,
      callback(response) {
        console.log({ response });
        const { failureCount = 0, successCount = 0 } = response;
        informationMessage(
          `執行完畢，成功向${successCount}份裝置發送推播訊息，${failureCount}份裝置發送失敗`
        );
      }
    });
  }

  return (
    <div>
      <Button
        color="error"
        variant="contained"
        sx={{ ...buttonLayout, width: '100%', display: 'inline-flex' }}
        onClick={(...e) => cancelAllMessageToken(platform, ...e)}
      >
        <p>清空{platform} token</p>
        <DeleteIcon color="#808080" />
      </Button>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: '10px', marginBottom: '10px' }}
      >
        <Grid size={{ xs: 6, md: 8 }}>
          <Grid size={{ xs: 3, md: 6 }}>
            <TextField
              label="推播標題"
              variant="filled"
              fullWidth
              sx={{ marginBottom: '5px' }}
              value={appMessageTitle}
              onChange={e => setAppMessageTitle(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 3, md: 6 }}>
            <TextField
              label="推播訊息"
              variant="filled"
              fullWidth
              sx={{ marginBottom: '5px' }}
              value={appMessage}
              onChange={e => setAppMessage(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 3, md: 6 }}>
            <TextField
              label="推播圖片網址"
              variant="filled"
              fullWidth
              value={appMessageImg}
              onChange={e => setAppMessageImg(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <Button
            sx={{ ...buttonStyle, width: '100%' }}
            variant="contained"
            onClick={handlePushNotification}
          >
            <p>發送{platform}推播訊息</p>
          </Button>
        </Grid>
      </Grid>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            sx={{ top: ' -16px' }}
            component="div"
            id="nested-list-subheader"
          >
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
              sx={{ maxWidth: '85%', overflow: 'auto' }}
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
  defaultMessageTitle: PropTypes.string,
  pushNotification: PropTypes.func,
  platform: PropTypes.string
};

// TokenDataView.defaultProps = {
//   defaultAppMessage: 'appMessage',
//   appMessageTokens: [],
//   title: 'App Message Tokens',
//   defaultMessageTitle: '推播訊息',
//   pushNotification: appMessage => appMessage
// };

export default TokenDataView;
