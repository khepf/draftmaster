import React, { useState, useEffect } from 'react';



const storeStateInLocalStorage = count => {
  localStorage.setItem('counterState', JSON.stringify({count}))
  console.log(localStorage);
}

const useLocalStorage = (initialState, key) => {
  const get = () => {
    const storage = localStorage.getItem(key);
    if (storage) return JSON.parse(storage).value;
    return initialState;
  };  

  const [value, setValue] = useState(get());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value]);

  return [value, setValue];
};

const Counter2 = ({max, step}) => {
  // out of the box useState
  // const [count, setCount] = useState(getStateFromLocalStorage());

  // custom hook combining useState and useEffect
  const [count , setCount ] = useLocalStorage(0, 'count');

  const increment = () => {
    setCount(count + 1);
    console.log('before!',count);
  }
  const increment2 = () => {
    setCount(c => {
      if (c >= max) return c;
      return c + step;
    });
  }
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  // if `count` changes, run this effect
  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  // out of the box useEffect
  // useEffect(() => {
  //   storeStateInLocalStorage(count);

  // }, [count]);

    return (
      <div>
        <p>{count}</p>
        <section>
          <button onClick={increment2}>+ 1</button>
          <button onClick={decrement}>- 1</button>
          <button onClick={reset}>Reset</button>
        </section>
      </div>
    );
}

export default Counter2;
