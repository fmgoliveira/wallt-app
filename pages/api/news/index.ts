import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../../database';
import News from '../../../../database/models/News';
import User from '../../../../database/models/User';
import authenticateToken from '../../../../firebase/validateAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const statusCode = await authenticateToken(req, res);
  if (statusCode) return res.status(statusCode).json({ success: false });

  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      const user = await User.findOne({ id: req.body.user?.uid });
      if (user) {
        res.send(await News.find());
      } else {
        res.status(404).json({ success: false });
      }
      break;
    case 'POST':
      const _user = await User.findOne({ id: req.body.user?.uid });
      const allowedUids = process.env.NEXT_PUBLIC_ALLOWED_UIDS?.split(',');
      if (_user && !allowedUids?.includes(_user.id)) return res.status(401).json({ success: false });
      try {
        const news = await News.create({
          ...req.body.news,
          timestamp: new Date(),
        });
        res.status(201).json({ success: true, data: news });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      const __user = await User.findOne({ id: req.body.user?.uid });
      const _allowedUids = process.env.NEXT_PUBLIC_ALLOWED_UIDS?.split(',');
      if (__user && !_allowedUids?.includes(__user.id)) return res.status(401).json({ success: false });
      try {
        const news = await News.deleteOne({
          _id: req.query.news_id
        });
        res.status(201).json({ success: true, data: news });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}