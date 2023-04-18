import request from '@/utils/request';

const url = process.env.TAPPAY_DOMAIN + '/payment';

export function POST_PayByPrime(payload = {}) {
  return request.post(url + '/pay-by-prime', payload, {
    headers: {
      'x-api-key': process.env.PARTNER_KEY
    }
  });
}
