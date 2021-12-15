import React from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import CustomHead from '../components/next/CustomHead';

function HomePage(props) {
  return (
    <>
      <CustomHead
        title="React Meetups"
        description="Browse a huge list of highly active React meetups!"
      />
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const findMeetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: findMeetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 3600,
  };
}

export default HomePage;
