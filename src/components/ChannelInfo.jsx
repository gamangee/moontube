import React from 'react';
import { useQuery } from 'react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

const ChannelInfo = ({ id, title }) => {
  const { youtube } = useYoutubeApi();
  const { data: channelDetail } = useQuery(
    ['channel', id],
    () => youtube.channelDetail(id),
    { staleTime: 1000 * 60 * 5 }
  );
  return (
    <>
      <div className='flex my-4 items-center'>
        {!channelDetail?.snippet?.thumbnails?.default.url && (
          <div className='w-10 h-10 mt-2 aspect-square rounded-full bg-red flex justify-center items-center text-lg font-semiBold'>
            {title.slice(0, 1).toUpperCase()}
          </div>
        )}
        {channelDetail?.snippet?.thumbnails?.default.url && (
          <div className='w-10 h-10 mt-2 rounded-full aspect-square overflow-hidden'>
            <img
              className='w-full'
              src={channelDetail.snippet?.thumbnails?.default.url}
              alt={id}
            />
          </div>
        )}
        <p className='text-lg font-medium ml-4'>{title}</p>
      </div>
      <div className='p-4 mb-6 w-full h-min-28 rounded-xl bg-[#222]'>
        <div className='mb-3'>
          {channelDetail?.snippet?.description === '' && (
            <div>no information</div>
          )}
          {channelDetail?.snippet?.description.length > 250
            ? channelDetail?.snippet?.description.slice(0, 250)
            : channelDetail?.snippet?.description}
          ...
        </div>
        <div className='text-xs opacity-60'>더보기</div>
      </div>
    </>
  );
};

export default ChannelInfo;
