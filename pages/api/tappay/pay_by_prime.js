import request from '@/utils/request';

const url = process.env.TAPPAY_DOMAIN + '/payment/pay-by-prime';

export default async function handler(req, res) {
  const method = req.method.toLocaleUpperCase();
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }
  const { body } = req;
  console.log(body);
  const result = await request.post(url, body, {
    headers: {
      'x-api-key':
        'partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM'
    }
  });
  res.status(200).json(result);
}