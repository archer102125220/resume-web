import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_homePage } from '@/services/index';

const name = 'system';

export const systemAsyncThunk = {
  GET_HomePage: createAsyncThunk(
    `${name}/GET_HomePage`,
    async function (arg, { dispatch }) {
      const { payload, callback, loading } = arg || {};
      if (typeof (loading) === 'function') loading(true);
      const data = await GET_homePage(payload);
      dispatch({ type: `${name}/SAVE_page_info`, payload: data });
      if (typeof (loading) === 'function') loading(false);
      if (typeof (callback) === 'function') callback();
      return data;
    }
  )
};

const systemSlice = createSlice({
  name,
  initialState: {
    message: { text: '', type: '' },
    isMobile: false,
    pageInfo: {}
  },
  reducers: {
    message_reset(state) {
      return { ...state, message: { text: '', type: '' } };
    },
    message_success(state, { payload }) {
      return { ...state, message: { text: payload, type: 'success' } };
    },
    message_error(state, { payload }) {
      return { ...state, message: { text: payload, type: 'error' } };
    },
    message_information(state, { payload }) {
      return { ...state, message: { text: payload, type: 'info' } };
    },
    message_warning(state, { payload }) {
      return { ...state, message: { text: payload, type: 'warning' } };
    },

    SAVE_message(state, { payload }) {
      return { ...state, message: payload };
    },
    SAVE_is_mobile(state, { payload }) {
      return { ...state, isMobile: payload };
    },
    SAVE_page_info(state, { payload }) {
      return { ...state, pageInfo: payload };
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(`${name}/GET_HomePage`, (state, { payload, callback }) => {
  //       console.log(`${name}/GET_HomePage`, callback);
  //       asyncThunk.GET_HomePage(payload);
  //       return state;
  //     });
  // },
});

export const systemActions = systemSlice.actions;
export default systemSlice.reducer;

// export default {
//   namespace: 'system',

//   state: {
//     message: { text: '', type: '' },
//     isMobile: false,
//     pageInfo: {}
//   },

//   effects: {
//     *message_reset(_, { put }) {
//       yield put({ type: 'SAVE_message', payload: { text: '', type: '' } });
//     },
//     *message_success({ payload }, { put }) {
//       yield put({
//         type: 'SAVE_message',
//         payload: { text: payload, type: 'success' },
//       });
//     },
//     *message_error({ payload }, { put }) {
//       yield put({
//         type: 'SAVE_message',
//         payload: { text: payload, type: 'error' },
//       });
//     },
//     *message_information({ payload }, { put }) {
//       yield put({
//         type: 'SAVE_message',
//         payload: { text: payload, type: 'info' },
//       });
//     },
//     *message_warning({ payload }, { put }) {
//       yield put({
//         type: 'SAVE_message',
//         payload: { text: payload, type: 'warning' },
//       });
//     },
//     *enquireScreen({ payload }, { put }) {
//       yield put({ type: 'SAVE_is_mobile', payload });
//     },
//     *GET_HomePage({ payload }, { call, put }) {
//       const data = yield call(GET_homePage, payload);
//       yield put({ type: 'SAVE_page_info', payload: data });
//     },
//   },

//   reducers: {
  //   SAVE_message(state, { payload }) {
  //     return { ...state, message: payload };
  //   },
  //   SAVE_is_mobile(state, { payload }) {
  //     return { ...state, isMobile: payload };
  //   },
  //   SAVE_page_info(state, { payload }) {
  //     return { ...state, pageInfo: payload };
  //   },
  //   SAVE_title(state, { payload }) {
  //     return { ...state, title: payload };
  //   },
  // },
// };
