export default function openAppTest(req, res) {
  // res.status(200).send('open app');
  res.status(200).json(JSON.parse(process.env.OPEN_IOS_APP || '{}'));
}
