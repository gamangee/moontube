import React, { useEffect, useState } from 'react';
import { BsYoutube, BsSearch } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';

const SearchHeader = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/moontube/search/${value}`);
  };

  useEffect(() => {
    setValue(keyword || '');
  }, [keyword]);

  return (
    <header className='w-full flex p-4 text-2xl border-b border-zinz-600 mb-4'>
      <Link to='/moontube' className='flex items-center'>
        <BsYoutube className='text-4xl text-red' />
        <h1 className='font-bold ml-2 text-3xl'>Youtube</h1>
      </Link>
      <form onSubmit={handleSubmit} className='w-full flex justify-center'>
        <input
          className='w-7/12 p-2 outline-none bg-black text-gray-50'
          type='text'
          placeholder='search...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className='bg-zinc-600 px-4'>
          <BsSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchHeader;
