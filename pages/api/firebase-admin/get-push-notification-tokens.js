import {
  mongoDBFindAllToken,
  sequelizeFindAllToken
} from '@servicesServices/firebaseAdmin';
// import { getTokens } from '@/utils/firebase.server';

async function handleFindAllToken() {
  let tokenList = await mongoDBFindAllToken();
  if (tokenList === undefined) {
    tokenList = await sequelizeFindAllToken();
  }
  return tokenList;
}

export default async function getMessageTokens(req, res) {
  try {
    const method = req.method.toLocaleUpperCase();
    if (method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
    }
    // const tokens = getTokens();
    const tokens = await handleFindAllToken();

    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json(error);
  }
}
