import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import Comments from '../components/Comments';
import RelatedVideos from '../components/RelatedVideos';

const VideoDetail = () => {
  const {
    state: { video },
  } = useLocation();
  const { title, channelId, channelTitle } = video.snippet;

  return (
    <section className='flex flex-col lg:flex-row'>
      <article className='basis-4/6'>
        <iframe
          title={video.id}
          id='player'
          type='text/html'
          width='100%'
          height='640'
          src={`https://www.youtube.com/embed/${video.id}`}
        />
        <div className='pt-6'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <ChannelInfo id={channelId} title={channelTitle} />
        </div>
        <Comments id={video.id} />
      </article>
      <section className='basis-2/6'>
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
};

export default VideoDetail;
