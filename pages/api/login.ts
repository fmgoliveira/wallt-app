import type { NextApiRequest, NextApiResponse } from 'next'
import { activateLink } from '../../passage';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { psg_magic_link } = req.query;
      if (!psg_magic_link) return res.status(400).json({ error: 'Bad Request' });
      const answer = await activateLink(psg_magic_link as string);
      if (answer) return res.status(200).json({ success: true });
      return res.status(400).json({ error: 'Bad Request' });
    default:
      res.setHeader('Allow', ['GET'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
