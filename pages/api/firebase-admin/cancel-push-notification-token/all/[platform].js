import {
  mongoDBRemoveToken,
  sequelizeRemoveToken,
  mongoDBFindAllToken,
  sequelizeFindAllToken
} from '@servicesServices/firebaseAdmin';

async function handleFindAllToken() {
  let tokenList = await mongoDBFindAllToken();
  if (tokenList === undefined) {
    tokenList = await sequelizeFindAllToken();
  }
  return tokenList;
}
async function handleRemoveToken(token) {
  let response = await mongoDBRemoveToken(token);
  if (response === undefined) {
    response = await sequelizeRemoveToken(token);
  }
  return response;
}

export default async function cancelMessageToken(req, res) {
  try {
    const method = req.method.toLocaleUpperCase();
    if (method !== 'DELETE') {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
    }
    const { platform } = req.query;
    const tokens = await handleFindAllToken();
    for (let i = 0; i < tokens.length; i++) {
      const { os, token } = tokens[i];
      if (os === platform) {
        const response = await handleRemoveToken(token);
        console.log({ ...response, platform });
      }
    }

    res.status(200).json({ success: true, platform });
  } catch (error) {
    res.status(500).json(error);
  }
}
