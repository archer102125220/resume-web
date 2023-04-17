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
  const tappayResult = await request.post(url, body, {
    headers: {
      'x-api-key': process.env.PARTNER_KEY
    }
  });
  console.log({ tappayResult });
  if (tappayResult.status === 0) {
    res.status(200).json(tappayResult);
  } else {
    res.status(400).json(tappayResult);
  }
}
