'use client';

import { useCounter } from '@/hooks/use-counter';

export default function Home() {
  const { value, increment, decrement, reset } = useCounter({
    defaultValue: 0,
  });

  return (
    <main>
      <div>Home page!</div>
      <div>
        <p className="mb-4">Counter Value: {value}</p>
        <button
          className="rounded bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200"
          type="button"
          onClick={() => increment()}
        >
          Increment
        </button>
        <button
          className="ml-4 rounded bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200"
          type="button"
          onClick={() => decrement()}
        >
          Decrement
        </button>
        <button
          className="ml-4 rounded bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200"
          type="button"
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
