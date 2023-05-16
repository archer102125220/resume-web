import request from '@/utils/request';

export function POST_appErrorLog(payload) {
  return request.post('/app-error-log', payload);
}
