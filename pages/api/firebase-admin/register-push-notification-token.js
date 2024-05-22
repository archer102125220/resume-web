import {
  mongoDBAddToken,
  sequelizeAddToken
} from '@servicesServices/firebaseAdmin';
// import { registerTokens } from '@/utils/firebase.server';

async function handleAddToken(data = {}) {
  const output = await Promise.all([
    mongoDBAddToken(data),
    sequelizeAddToken(data)
  ]);
  return output;
}

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
    await handleAddToken(body);

    res.status(200).json({ success: true, token: body.token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
