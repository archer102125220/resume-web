import { androidFirebaseApp } from '@/utils/firebase.server';

export default async function androidPushMessage(req, res) {
  try {
    const method = req.method.toLocaleUpperCase();
    if (method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
    }
    const { body } = req;
    if (body.data === undefined || body.data === null) {
      res.status(500).send('Missing parameter: data');
      return;
    } else if (Array.isArray(body.token) === false || body.token.length <= 0) {
      res.status(500).send('Missing parameter: token');
      return;
    }
    const response = await androidFirebaseApp.messaging().sendMulticast({
      data: { msg: body.data },
      tokens: body.token
    });
    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}
