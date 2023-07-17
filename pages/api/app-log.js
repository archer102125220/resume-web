import NextCors from 'nextjs-cors';

export default async function appLog(req, res) {
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
     // Options
     methods: ['POST'],
     origin: '*',
     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const method = req.method.toLocaleUpperCase();
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }
  const { body } = req;
  console.log(body);
  res.status(200).send('');
}
