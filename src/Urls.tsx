'use client';

import { FormEvent } from 'react';

import useStreamData from '~/useStreamingData';

export default function Urls() {
  const { data, stream, isStreaming } = useStreamData();

  const startStream = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    stream('/api/stream');
  };

  return (
    <>
      <form onSubmit={startStream}>
        <button
          className='w-40 px-4 py-2 antialiased font-bold text-white border rounded-md bg-violet-500'
          disabled={isStreaming}
        >
          {isStreaming ? 'Looking up...' : 'Start'}
        </button>
      </form>
      <pre className='w-full px-4 py-2 whitespace-pre bg-white border rounded-md shadow-inner border-violet-300'>
        {data || 'Click Start to look up URLs...'}
      </pre>
    </>
  );
}
