import React from 'react';
import { useQuery } from 'react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { DateFormatter } from '../util/date';

export default function Comments({ id }) {
  const { youtube } = useYoutubeApi();
  const { data: comments } = useQuery(
    ['channel', id],
    () => youtube.commentThreads(id),
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <div>
      <div>
        <h1>댓글</h1>
        <div>
          <div>
            {comments?.map((comment) => (
              <li key={comment.id} className='list-none flex mb-4'>
                <div>
                  {!comment.snippet.topLevelComment.snippet
                    .authorProfileImageUrl && (
                    <div className='w-10 h-10 mt-2 aspect-square rounded-full bg-red flex justify-center items-center text-lg font-semiBold'>
                      {comment.snippet.topLevelComment.snippet.authorDisplayName
                        .slice(0, 1)
                        .toUpperCase()}
                    </div>
                  )}
                  {comment.snippet.topLevelComment.snippet
                    .authorProfileImageUrl && (
                    <div className='w-10 h-10 mt-2 rounded-full aspect-square overflow-hidden'>
                      <img
                        className='w-full'
                        src={
                          comment.snippet.topLevelComment.snippet
                            .authorProfileImageUrl
                        }
                        alt={comment.snippet.topLevelComment.id}
                      />
                    </div>
                  )}
                </div>
                <div className='ml-4 max-w-2xl'>
                  <div className='font-semibold flex space-x-2 items-center'>
                    <div>
                      {
                        comment.snippet.topLevelComment.snippet
                          .authorDisplayName
                      }
                    </div>
                    <div className='font-light text-xs opacity-60'>
                      {DateFormatter(
                        comment.snippet.topLevelComment.publishedAt,
                        'ko'
                      )}
                    </div>
                  </div>
                  <div>
                    {comment.snippet.topLevelComment.snippet.textOriginal}
                  </div>
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
