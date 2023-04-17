// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts
// https://github.com/vercel/next.js/blob/canary/examples/api-routes-rest/pages/api/user/%5Bid%5D.ts

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}
