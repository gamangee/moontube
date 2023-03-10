import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DateFormatter } from '../util/date';

const VideoCard = ({ video, type }) => {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();
  const isList = type === 'list';

  return (
    <li
      className={isList ? 'flex gap-4 ml-4 mb-4' : ''}
      onClick={() =>
        navigate(`/moontube/videoDetail/${video.id}`, { state: { video } })
      }
    >
      <img
        className={isList ? 'w-60' : 'w-full rounded-md'}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div>
        <p className='font-semibold my-2 line-clamp-2'>{title}</p>
        <p className='text-sm opacity-80'>{channelTitle}</p>
        <p className='text-sm opacity-80'>{DateFormatter(publishedAt, 'ko')}</p>
      </div>
    </li>
  );
};

export default VideoCard;
