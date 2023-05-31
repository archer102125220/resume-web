import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  POST_registerMessageToken,
  GET_getMessageTokens,
  POST_pushNotification,
  DELETE_cancelMessageToken,
  DELETE_cancelAllMessageToken,
  POST_androidPushNotification,
  POST_iosPushNotification,
  POST_webPushMessage
} from '@servicesClient/firebaseAdmin';

const name = 'firebaseAdmin';

export const firebaseAdminAsyncThunk = {
  GET_GetMessageTokens: createAsyncThunk(
    `${name}/GET_GetMessageTokens`,
    async function (arg, { dispatch }) {
      const { payload, callback, loading } = arg || {};
      if (typeof loading === 'function') loading(true);
      let data;
      try {
        data = await GET_getMessageTokens(payload);
        dispatch({ type: `${name}/SAVE_app_message_token`, payload: data });
      } catch (error) {
        console.log(error);
      }
      if (typeof loading === 'function') loading(false);
      if (typeof callback === 'function') callback(data);
      return data;
    }
  ),
  POST_RegisterMessageToken: createAsyncThunk(
    `${name}/POST_RegisterMessageToken`,
    async function (arg) {
      const { payload, callback, loading } = arg || {};
      if (typeof loading === 'function') loading(true);
      let data;
      try {
        data = await POST_registerMessageToken(payload);
      } catch (error) {
        console.log(error);
      }
      if (typeof loading === 'function') loading(false);
      if (typeof callback === 'function') callback(data);
      return data;
    }
  ),
  POST_PushNotification: createAsyncThunk(
    `${name}/POST_PushNotification`,
    async function (arg) {
      const { payload, callback, loading } = arg || {};
      if (typeof loading === 'function') loading(true);
      let data;
      try {
        data = await POST_pushNotification(payload);
      } catch (error) {
        console.log(error);
      }
      if (typeof loading === 'function') loading(false);
      if (typeof callback === 'function') callback(data);
      return data;
    }
  ),
  DELETE_CancelMessageToken: createAsyncThunk(
    `${name}/DELETE_CancelMessageToken`,
    async function (arg) {
      const { payload, callback, loading } = arg || {};
      if (typeof loading === 'function') loading(true);
      let data;
      try {
        data = await DELETE_cancelMessageToken(payload);
      } catch (error) {
        console.log(error);
      }
      if (typeof loading === 'function') loading(false);
      if (typeof callback === 'function') callback(data);
      return data;
    }
  ),
  DELETE_CancelAllMessageToken: createAsyncThunk(
    `${name}/DELETE_CancelAllMessageToken`,
    async function (arg) {
      const { payload, callback, loading } = arg || {};
      if (typeof loading === 'function') loading(true);
      let data;
      try {
        data = await DELETE_cancelAllMessageToken(payload);
      } catch (error) {
        console.log(error);
      }
      if (typeof loading === 'function') loading(false);
      if (typeof callback === 'function') callback(data);
      return data;
    }
  ),
  POST_AndroidPushNotification: createAsyncThunk(
    `${name}/POST_AndroidPushNotification`,
    async function (arg) {
      const { payload, callback, loading } = arg || {};
      if (typeof loading === 'function') loading(true);
      let data;
      try {
        data = await POST_androidPushNotification(payload);
      } catch (error) {
        console.log(error);
      }
      if (typeof loading === 'function') loading(false);
      if (typeof callback === 'function') callback(data);
      return data;
    }
  ),
  POST_IosPushNotification: createAsyncThunk(
    `${name}/POST_IosPushNotification`,
    async function (arg) {
      const { payload, callback, loading } = arg || {};
      if (typeof loading === 'function') loading(true);
      let data;
      try {
        data = await POST_iosPushNotification(payload);
      } catch (error) {
        console.log(error);
      }
      if (typeof loading === 'function') loading(false);
      if (typeof callback === 'function') callback(data);
      return data;
    }
  ),
  POST_WebPushMessage: createAsyncThunk(
    `${name}/POST_WebPushMessage`,
    async function (arg) {
      const { payload, callback, loading } = arg || {};
      if (typeof loading === 'function') loading(true);
      let data;
      try {
        data = await POST_webPushMessage(payload);
      } catch (error) {
        console.log(error);
      }
      if (typeof loading === 'function') loading(false);
      if (typeof callback === 'function') callback(data);
      return data;
    }
  )
};

const firebaseAdminSlice = createSlice({
  name,
  initialState: {
    appMessageTokens: []
  },
  reducers: {
    SAVE_app_message_token(state, { payload }) {
      return { ...state, appMessageTokens: payload };
    }
  }
});

export const firebaseAdminActions = firebaseAdminSlice.actions;
export default firebaseAdminSlice.reducer;
