import request from '@/utils/request';

export function GET_appErrorLog(payload) {
  return request.get('/app-error-log', payload);
}
