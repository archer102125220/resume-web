import { findAllToken } from '@servicesServices/firebaseAdmin';
import {
  // getTokens,
  firebaseApp,
  androidFirebaseApp,
  iosFirebaseApp
} from '@/utils/firebase.server';

export default async function pushMessage(req, res) {
  try {
    const method = req.method.toLocaleUpperCase();
    if (method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
    }
    // const tokens = getTokens().map(({ token }) => token);
    const tokens = await findAllToken();

    const { body } = req;
    console.log(body.data);
    const responseArray = await Promise.all([
      firebaseApp.messaging().sendMulticast({
        data: { msg: body.data },
        tokens: tokens
          .filter(({ os }) => os === 'web')
          .map(({ token }) => token)
      }),
      androidFirebaseApp.messaging().sendMulticast({
        data: { msg: body.data },
        tokens: tokens
          .filter(({ os }) => os === 'android')
          .map(({ token }) => token)
      }),
      iosFirebaseApp.messaging().sendMulticast({
        data: { msg: body.data },
        tokens: tokens
          .filter(({ os }) => os === 'ios')
          .map(({ token }) => token)
      })
    ]);

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
