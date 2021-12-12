import React from 'react';
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
  return {
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { meetupId } = context.params;

  return {
    props: {
      meetup: {
        id: meetupId,
        image:
          'https://cdn.pixabay.com/photo/2014/01/13/04/17/meetup-243206_960_720.jpg',
        title: 'A First Meetup',
        description: 'The meetup description',
        address: 'Some Street 5, Some City',
      },
    },
    revalidate: 3600,
  };
}

export default MeetupDetails;
