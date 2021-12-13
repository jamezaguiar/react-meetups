import { MongoClient } from 'mongodb';
import { requestMethod, statusCode } from '../../constants/httpConstants';
import { MONGO_URL } from '../../env/mongo';

async function handler(req, res) {
  if (req.method === requestMethod.POST) {
    const data = req.body;

    let client;

    try {
      client = await MongoClient.connect(MONGO_URL);
      const db = client.db();

      const meetupsCollection = db.collection('meetups');
      const result = await meetupsCollection.insertOne(data);

      res
        .status(statusCode.CREATED)
        .json({ message: 'Meetup inserted!', result });
    } catch (error) {
      console.error(error);
    } finally {
      client.close();
    }
  }
}

export default handler;
