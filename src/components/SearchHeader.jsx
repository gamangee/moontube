import React, { useEffect, useState } from 'react';
import { BsYoutube, BsSearch } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';

const SearchHeader = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/moontube/videos/${value}`);
  };

  useEffect(() => {
    setValue(keyword || '');
  }, [keyword]);

  return (
    <header className='w-full flex p-4 text-2xl mb-4'>
      <Link to='/moontube' className='flex items-center'>
        <BsYoutube className='text-4xl text-red' />
        <h1 className='ml-2 text-3xl'>Youtube</h1>
      </Link>
      <form onSubmit={handleSubmit} className='w-full flex justify-center'>
        <input
          className='w-4/12 p-2 outline-none bg-[#121212] text-gray-50 rounded-l-full border-[#222] border-2'
          type='text'
          placeholder='검색'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className='bg-[#222] px-6 rounded-r-full'>
          <BsSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchHeader;
