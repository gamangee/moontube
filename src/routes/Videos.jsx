import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { useYoutubeApi } from '../context/YoutubeApiContext';

const Videos = () => {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['videos', keyword], () => youtube.search(keyword), {
    staleTime: 1000 * 60 * 1,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {!isLoading && videos && (
        <div className='px-10'>
          <ul className='grid grid-cols-1 gap-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Videos;
