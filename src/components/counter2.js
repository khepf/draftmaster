import React, { useState, useEffect } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  console.log(storage);
  if (storage) return JSON.parse(storage).count;
  return { count: 0 }; 
};

const storeStateInLocalStorage = count => {
  localStorage.setItem('counterState', JSON.stringify({count}));
  console.log(localStorage);
}

const Counter2 = ({ max, step }) => {
  const [count, setCount] = useState(getStateFromLocalStorage);

  const increment = () => {
    setCount(c => {
      if (c >= max) return c;
      return c + step;
    });
  };

  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  useEffect(() => {
    storeStateInLocalStorage(count)
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <section>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
}

export default Counter2;