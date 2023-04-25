import { addToken } from '@serverServices/firebaseAdmin';
// import { registerTokens } from '@/utils/firebase.server';

export default async function registerMessageToken(req, res) {
  try {
    const method = req.method.toLocaleUpperCase();
    if (method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
    }
    const { body } = req;
    // registerTokens(body.token);
    await addToken(body);

    res.status(200).json({ success: true, token: body.token });
  } catch (error) {
    res.status(500).json(error);
  }
}
