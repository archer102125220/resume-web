export default {
  namespace: 'system',

  state: {
    message: { text: '', type: '' },
    isMobile: false,
    pageInfo: {},
  },

  effects: {
    // eslint-disable-next-line no-unused-vars
    *message_reset({ payload }, { put }) {
      yield put({ type: 'SAVE_message', payload: { text: '', type: '' } });
    },
    *message_success({ payload }, { put }) {
      yield put({
        type: 'SAVE_message',
        payload: { text: payload, type: 'success' },
      });
    },
    *message_error({ payload }, { put }) {
      yield put({
        type: 'SAVE_message',
        payload: { text: payload, type: 'error' },
      });
    },
    *message_information({ payload }, { put }) {
      yield put({
        type: 'SAVE_message',
        payload: { text: payload, type: 'info' },
      });
    },
    *message_warning({ payload }, { put }) {
      yield put({
        type: 'SAVE_message',
        payload: { text: payload, type: 'warning' },
      });
    },
    *enquireScreen({ payload }, { put }) {
      yield put({ type: 'SAVE_is_mobile', payload });
    },
  },

  reducers: {
    SAVE_message(state, { payload }) {
      return { ...state, message: payload };
    },
    SAVE_is_mobile(state, { payload }) {
      return { ...state, isMobile: payload };
    },
    SAVE_page_info(state, { payload }) {
      return { ...state, pageInfo: payload };
    },
    SAVE_title(state, { payload }) {
      return { ...state, title: payload };
    },
  },
};
