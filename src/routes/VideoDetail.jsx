import React from 'react';
import { useQuery } from 'react-query';
import { Link, useLocation, useParams } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import RelatedVideos from '../components/RelatedVideos';
import { useYoutubeApi } from '../context/YoutubeApiContext';

const VideoDetail = () => {
  const {
    state: { video },
  } = useLocation();
  const { title, channelId, channelTitle, description, id } = video.snippet;
  const { youtube } = useYoutubeApi();
  const { videoId } = useParams();

  const { data: videoComments } = useQuery(
    ['commentThreads', videoId],
    () => youtube.commentThreads(videoId),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  // console.log(videoComments);

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
          <p className='whitespace-pre-wrap'>{description}</p>
          <div>
            <h1>댓글 데이터</h1>
            <div>
              {videoComments?.map((comment) => (
                <li key={comment.id} className='list-none'>
                  <span className='mr-4'>
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </span>
                  <hr />
                  <span>
                    {comment.snippet.topLevelComment.snippet.textOriginal}
                  </span>
                </li>
              ))}
            </div>
          </div>
        </div>
      </article>
      <section className='basis-2/6'>
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
};

export default VideoDetail;
