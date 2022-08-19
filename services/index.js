import axios from '@/utils/axios';

export function GET_homePage(payload = {}) {
  return axios.get('/hello', payload);
}
