import request from '@/utils/request';

export function GET_homePage(payload = { a: 'a' }) {
  return request.get('/hello', payload);
}
