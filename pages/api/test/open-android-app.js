export default async function openAndroidApp(req, res) {
  res.status(200).json(JSON.parse(process.env.OPEN_ANDROID_APP || '{}'));
}
