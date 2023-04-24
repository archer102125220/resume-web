import { getMessaging } from 'firebase-admin/app';

import {
  getTokens,
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
    const tokens = getTokens();

    const { body } = req;
    const response = await Promise.all([
      getMessaging(androidFirebaseApp).sendMulticast({
        data: body.data,
        tokens
      }),
      getMessaging(iosFirebaseApp).sendMulticast({
        data: body.data,
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
