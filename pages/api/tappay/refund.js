import { POST_Refund } from '@serverServices/tappay';

export default async function refund(req, res) {
  const method = req.method.toLocaleUpperCase();
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }
  const { body } = req;
  const tappayResult = await POST_Refund(body);
  console.log({ tappayResult });
  if (tappayResult.status === 0) {
    res.status(200).json(tappayResult);
  } else {
    res.status(500).json(tappayResult);
  }
}
