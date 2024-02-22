import request from '@/utils/request';

export function test(payload) {
  return request.get('/open-ai/test', payload);
}
