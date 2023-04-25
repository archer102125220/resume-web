import { findAllToken } from '@serverServices/firebaseAdmin';
// import { getTokens } from '@/utils/firebase.server';

export default async function getMessageTokens(req, res) {
  try {
    const method = req.method.toLocaleUpperCase();
    if (method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
    }
    // const tokens = getTokens();
    const tokens = await findAllToken();

    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json(error);
  }
}
