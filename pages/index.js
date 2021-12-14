import React from 'react';
import { MongoClient } from 'mongodb';
import Meetup from '../models/Meetup';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return <MeetupList meetups={props.meetups}></MeetupList>;
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const findMeetups = await meetupsCollection.find().toArray();

  const meetups = findMeetups.map(meetup => new Meetup(meetup));

  client.close();

  return {
    props: { meetups: JSON.parse(JSON.stringify(meetups)) },
    revalidate: 3600,
  };
}

export default HomePage;
