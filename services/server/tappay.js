import request from '@/utils/request';

const url = process.env.TAPPAY_DOMAIN + '/payment';

export function POST_PayByPrime(payload = {}) {
  return request.post(url + '/pay-by-prime', payload, {
    headers: {
      'x-api-key': process.env.PARTNER_KEY
    }
  });
}

export function POST_Refund(payload = {}) {
  return request.post(url + '/refund', payload, {
    headers: {
      'x-api-key': process.env.PARTNER_KEY
    }
  });
}

export function POST_Record(payload = {}) {
  return request.post(url + '/query', payload, {
    headers: {
      'x-api-key': process.env.PARTNER_KEY
    }
  });
}
