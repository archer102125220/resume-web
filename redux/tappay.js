import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { POST_payByPrime, POST_refund } from '@servicesClient/tappay';

const name = 'tappay';

export const tappayAsyncThunk = {
  POST_PayByPrime: createAsyncThunk(
    `${name}/POST_PayByPrime`,
    async function (arg, { dispatch }) {
      const { payload, callback, loading } = arg || {};
      if (typeof loading === 'function') loading(true);
      let data;
      try {
        data = await POST_payByPrime(payload);
        dispatch({ type: `${name}/SAVE_app_message_token`, payload: data });
      } catch (error) {
        console.log(error);
      }
      if (typeof loading === 'function') loading(false);
      if (typeof callback === 'function') callback(data);
      return data;
    }
  ),
  POST_Refund: createAsyncThunk(`${name}/POST_Refund`, async function (arg) {
    const { payload, callback, loading } = arg || {};
    if (typeof loading === 'function') loading(true);
    let data;
    try {
      data = await POST_refund(payload);
    } catch (error) {
      console.log(error);
    }
    if (typeof loading === 'function') loading(false);
    if (typeof callback === 'function') callback(data);
    return data;
  })
};

const tappaySlice = createSlice({
  name,
  initialState: {
    appId: process.env.TAPPAY_APP_ID || -1,
    appKey: process.env.TAPPAY_APP_KEY || '',
    prod: process.env.TAPPAY_PROD || false,
    partnerKey: process.env.TAPPAY_PARTNER_KEY || ''
  },
  reducers: {}
});

export const tappayActions = tappaySlice.actions;
export default tappaySlice.reducer;
