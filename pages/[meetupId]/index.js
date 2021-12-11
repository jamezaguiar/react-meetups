import React from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://cdn.pixabay.com/photo/2014/01/13/04/17/meetup-243206_960_720.jpg"
      title="A First Meetup"
      description="The meetup description"
      address="Some Street 5, Some City"
    />
  );
}

export default MeetupDetails;
