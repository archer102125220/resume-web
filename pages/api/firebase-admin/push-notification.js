import { getMessaging } from 'firebase-admin/messaging';

import {
  mongoDBFindAllToken,
  sequelizeFindAllToken
} from '@servicesServices/firebaseAdmin';
import {
  // getTokens,
  getFirebaseApp,
  // firebaseApp,
  getAndroidFirebaseApp,
  // androidFirebaseApp,
  getIosFirebaseApp
  // iosFirebaseApp
} from '@/utils/helpers/firebase.server';

async function handleFindAllToken() {
  let tokenList = await mongoDBFindAllToken();
  if (tokenList === undefined) {
    tokenList = await sequelizeFindAllToken();
  }
  return tokenList;
}

export default async function pushMessage(req, res) {
  try {
    const method = req.method.toLocaleUpperCase();
    if (method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
    }
    // const tokens = getTokens().map(({ token }) => token);
    const tokens = await handleFindAllToken();

    const { body } = req;
    const webTokens = tokens
      .filter(({ os }) => os === 'web')
      .map(({ token }) => token);
    const androidTokens = tokens
      .filter(({ os }) => os === 'android')
      .map(({ token }) => token);
    const iosTokens = tokens
      .filter(({ os }) => os === 'ios')
      .map(({ token }) => token);
    console.log(body.data, { webTokens, androidTokens, iosTokens });

    const firebaseApp = getFirebaseApp();
    const androidFirebaseApp = getAndroidFirebaseApp();
    const iosFirebaseApp = getIosFirebaseApp();

    const promiseArray = [];

    if (webTokens.length > 0) {
      promiseArray.push(
        getMessaging(firebaseApp).sendEachForMulticast({
          data: { msg: body.data },
          tokens: webTokens
        })
      );
    }
    if (androidTokens.length > 0) {
      promiseArray.push(
        getMessaging(androidFirebaseApp).sendEachForMulticast({
          data: { msg: body.data },
          tokens: androidTokens
        })
      );
    }
    if (iosTokens.length > 0) {
      promiseArray.push(
        getMessaging(iosFirebaseApp).sendEachForMulticast({
          data: { msg: body.data },
          tokens: iosTokens
        })
      );
    }

    const responseArray = await Promise.all(promiseArray);

    const response = { failureCount: 0, successCount: 0, responses: [] };
    responseArray.forEach(_response => {
      response.failureCount += _response.failureCount;
      response.successCount += _response.successCount;
      const responses = [...response.responses];
      response.responses = responses.concat(_response.responses);
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
