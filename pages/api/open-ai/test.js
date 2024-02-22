import { test } from '@/services/server/openAi';
export default async function handler(req, res) {
  try {
    const result = await test();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}
