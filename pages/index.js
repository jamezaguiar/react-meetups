import React, { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://cdn.pixabay.com/photo/2014/01/13/04/17/meetup-243206_960_720.jpg',
    address: 'Some Address 5, 12345 Some City',
    description: 'This is a first meetup',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://cdn.pixabay.com/photo/2014/01/13/04/17/meetup-243206_960_720.jpg',
    address: 'Some Address 12, 12345 Some City',
    description: 'This is a second meetup',
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups}></MeetupList>;
}

export async function getStaticProps() {
  return {
    props: { meetups: DUMMY_MEETUPS },
    revalidate: 10,
  };
}

export default HomePage;
