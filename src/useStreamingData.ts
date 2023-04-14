import { useState } from 'react';

export default function useStreamingData() {
  const [data, setData] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const stream = async (
    endpoint: string,
    body?: object,
    update?: (prev: any, data: any) => any
  ) => {
    setIsStreaming(true);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) throw new Error(response.statusText);

    const data = response.body;
    if (!data) return;

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      console.log('chunkValue', chunkValue);

      setData((prev) => prev + chunkValue + '\n');
    }

    setData((prev) => prev + '\n\n');
    setIsStreaming(false);
  };

  return {
    data,
    stream,
    isStreaming,
  };
}
