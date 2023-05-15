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

export function DELETE_cancelAllMessageToken(payload) {
  return request.delete(
    `/firebase-admin/cancel-push-notification-token/all/${payload}`
  );
}

export function POST_androidPushNotification(payload) {
  return request.post('/firebase-admin/android-push-notification', payload);
}

export function POST_iosPushNotification(payload) {
  return request.post('/firebase-admin/ios-push-notification', payload);
}

export function POST_webPushMessage(payload) {
  return request.post('/firebase-admin/web-push-notification', payload);
}
