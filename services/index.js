import axios from '@/utils/axios';

export function GET_homePage(payload = { a: 'a' }) {
  return axios.get('/hello', payload);
}
