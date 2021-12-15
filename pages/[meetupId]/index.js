import React from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  const { meetup } = props;
  const { image, title, description, address } = meetup;

  return (
    <MeetupDetail
      image={image}
      title={title}
      description={description}
      address={address}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const findMeetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    paths: findMeetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { meetupId } = context.params;
  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const findMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  const meetup = {
    ...findMeetup,
    _id: findMeetup._id.toString(),
  };

  client.close();

  return {
    props: { meetup },
    revalidate: 3600,
  };
}

export default MeetupDetails;
