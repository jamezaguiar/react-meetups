import { MongoClient } from 'mongodb';
import { requestMethod, statusCode } from '../../constants/httpConstants';

async function handler(req, res) {
  if (req.method === requestMethod.POST) {
    const data = req.body;

    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);

    res
      .status(statusCode.CREATED)
      .json({ message: 'Meetup inserted!', result });

    client.close();
  }
}

export default handler;
