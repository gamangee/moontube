import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import FakeYoutube from '../api/fakeYoutubeClient';
import Youtube from '../api/youtube';
import { useYoutubeApi } from '../context/YoutubeApiContext';

const Videos = () => {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  // useQuery : 비동기 상태 관리 라이브러리

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['videos', keyword], () => youtube.search(keyword));

  return (
    <>
      <div>Videos {keyword ? keyword : 'are not found'}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {!isLoading && videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Videos;
