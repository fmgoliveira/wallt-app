import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const { pin } = req.query;
      if (!process.env.UNLOCK_PIN) return res.status(500).json({ success: false, error: 'No unlock pin set' });

      if (pin === process.env.UNLOCK_PIN) return res.status(200).json({ success: true });
      else return res.status(200).json({ success: false });
    default:
      res.setHeader('Allow', ['POST'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
