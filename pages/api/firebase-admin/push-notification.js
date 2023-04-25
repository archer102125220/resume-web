import { findAllToken } from '@serverServices/firebaseAdmin';
import {
  // getTokens,
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
    let tokens = await findAllToken();
    tokens = tokens.map(({ token }) => token);
    console.log({ tokens });

    const { body } = req;
    console.log(body.data);
    const response = await Promise.all([
      androidFirebaseApp.messaging().sendMulticast({
        data: { msg: body.data },
        tokens
      }),
      iosFirebaseApp.messaging().sendMulticast({
        data: { msg: body.data },
        tokens
      })
    ]);
    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
