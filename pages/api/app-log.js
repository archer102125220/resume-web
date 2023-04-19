export default function handler(req, res) {
  const method = req.method.toLocaleUpperCase();
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }
  const { body } = req;
  if (typeof body === 'string') {
    console.log(body);
  } else {
    console.log({ appLog: body });
  }
  res.status(200).send('');
}
