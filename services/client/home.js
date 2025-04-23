import request from '@/utils/request';

export function GET_homeExperience(useCache = true) {
  return request.get('/home/experience', null, { useCache });
}
