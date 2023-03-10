import React from 'react';
import { useQuery } from 'react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

const ChannelInfo = ({ id, title }) => {
  const { youtube } = useYoutubeApi();
  const { data: imgURL } = useQuery(
    ['channel', id],
    () => youtube.channelImgURL(id),
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <div className='flex my-4 mb-8 items-center'>
      {!imgURL && (
        <div className='w-10 h-10 rounded-full mr-4 bg-red flex justify-center items-center text-lg font-semiBold'>
          {title.slice(0, 1).toUpperCase()}
        </div>
      )}
      {imgURL && (
        <img className='w-10 h-10 rounded-full mr-4' src={imgURL} alt={title} />
      )}
      <p className='text-lg font-medium'>{title}</p>
    </div>
  );
};

export default ChannelInfo;
