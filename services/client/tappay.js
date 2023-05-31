import request from '@/utils/request';

export function POST_payByPrime(payload) {
  return request.post('/tappay/pay_by_prime', payload);
}

export function POST_refund(payload) {
  return request.post('/tappay/refund', payload);
}
