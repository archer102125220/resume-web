import { removeToken, findAllToken } from '@serverServices/firebaseAdmin';
import { cancelTokens } from '@/utils/firebase.server';

export default async function cancelMessageToken(req, res) {
  try {
    const method = req.method.toLocaleUpperCase();
    if (method !== 'DELETE') {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
    }
    const { platform } = req.query;
    cancelTokens(platform);
    const tokens = await findAllToken();
    for (let i = 0; i < tokens.length; i++) {
      const { os, token } = tokens[i];
      if (os === platform) {
        const response = await removeToken(token);
        console.log(response);
      }
    }

    res.status(200).json({ success: true, platform });
  } catch (error) {
    res.status(500).json(error);
  }
}