import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { DateFormatter } from '../util/date';
import { ViewCount } from '../util/views';

const VideoCard = ({ video, type }) => {
  const { title, thumbnails, channelTitle, publishedAt, channelId } =
    video.snippet;
  const navigate = useNavigate();
  const isList = type === 'list';

  const { youtube } = useYoutubeApi();
  const { data: channelDetail } = useQuery(
    ['channel', channelId],
    () => youtube.channelDetail(channelId),
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <li
      className={isList ? 'flex gap-4 ml-4 mb-4' : ''}
      onClick={() =>
        navigate(`/moontube/videoDetail/${video.id}`, { state: { video } })
      }
    >
      <img
        className={isList ? 'w-60 rounded' : 'w-full rounded-md'}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div className={isList ? '' : 'mt-2'}>
        <div className='flex items-start'>
          <div className={isList ? 'hidden' : 'mr-2'}>
            {!channelDetail?.snippet?.thumbnails?.default.url && (
              <div className='w-10 h-10 mt-2 aspect-square rounded-full bg-red flex justify-center items-center text-lg font-semiBold'>
                {channelTitle.slice(0, 1).toUpperCase()}
              </div>
            )}
            {channelDetail?.snippet?.thumbnails?.default.url && (
              <div className='w-10 h-10 mt-2 rounded-full aspect-square overflow-hidden'>
                <img
                  className='w-full'
                  src={channelDetail.snippet?.thumbnails?.default.url}
                  alt={channelTitle}
                />
              </div>
            )}
          </div>
          <div>
            <div
              className={
                isList ? 'font-semibold my-2' : 'font-semibold my-2 h-12'
              }
            >
              {title.length > 60 ? title.slice(0, 60) + '...' : title}
            </div>
            <p className='text-sm opacity-70'>{channelTitle}</p>
            <div className='text-sm opacity-70 flex items-center space-x-1'>
              <span>
                {ViewCount(channelDetail?.statistics?.viewCount) || ''}
              </span>
              <span className='block w-1 h-1 aspect-square rounded bg-white'></span>
              <span>{DateFormatter(publishedAt, 'ko')}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default VideoCard;
