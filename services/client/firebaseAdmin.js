import request from '@/utils/request';

export function GET_getMessageTokens() {
  return request.get('/firebase-admin/get-push-notification-tokens');
}

export function POST_registerMessageToken(payload) {
  return request.post(
    '/firebase-admin/register-push-notification-token',
    payload
  );
}

export function POST_pushNotification(payload) {
  return request.post('/firebase-admin/push-notification', payload);
}

export function DELETE_cancelMessageToken(payload) {
  return request.delete(
    `/firebase-admin/cancel-push-notification-token/${payload}`
  );
}
