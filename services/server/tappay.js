import request from '@/utils/request';

const url = process.env.TAPPAY_DOMAIN;

export function POST_PayByPrime(payload = {}) {
  return request.post(url + '/payment/pay-by-prime', payload, {
    headers: {
      'x-api-key': process.env.TAPPAY_PARTNER_KEY
    }
  });
}

export function POST_Refund(payload = {}) {
  return request.post(url + '/transaction/refund', payload, {
    headers: {
      'x-api-key': process.env.TAPPAY_PARTNER_KEY
    }
  });
}

export function POST_Record(payload = {}) {
  return request.post(url + '/transaction/query', payload, {
    headers: {
      'x-api-key': process.env.TAPPAY_PARTNER_KEY
    }
  });
}
