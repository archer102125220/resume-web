import { mongoDBRemoveToken } from '@servicesServices/firebaseAdmin';
import { cancelTokens } from '@/utils/firebase.server';

export default async function cancelMessageToken(req, res) {
  try {
    const method = req.method.toLocaleUpperCase();
    if (method !== 'DELETE') {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
    }
    const { token } = req.query;
    cancelTokens(token);
    const response = await mongoDBRemoveToken(token);
    console.log(response);

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json(error);
  }
}
