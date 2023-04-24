import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  POST_registerMessageToken,
  GET_getMessageTokens,
  POST_pushNotification
} from '@serverClient/firebaseAdmin';

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
      if (typeof callback === 'function') callback();
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
      if (typeof callback === 'function') callback();
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
      if (typeof callback === 'function') callback();
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
