import React, { useState, useEffect, useRef, useReducer } from 'react';

// const getStateFromLocalStorage = () => {
//   const storage = localStorage.getItem('counterState');
//   console.log(storage);
//   if (storage) return JSON.parse(storage).count;
//   return { count: 0 }; 
// };

// const storeStateInLocalStorage = count => {
//   localStorage.setItem('counterState', JSON.stringify({count}));
//   console.log(localStorage);
// }

// const useLocalStorage = (initialState, key) => {
//   const get = () => {
//     const storage = localStorage.getItem(key);
//     console.log(localStorage, storage);
//     if (storage) return JSON.parse(storage)[value];
//     return initialState; 
//   };

//   const [value, setValue] = useState(get());

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify({value}));
//   }, [value]);

//   return [value, setValue];
// }

const Counter2 = ({ max, step }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef();

  let message = '';
  if (countRef.current < count) {
    message = 'Higher';
    console.log(`countRef.current: ${countRef.current}`);
  }
  if (countRef.current > count) {
    message = 'Lower';
    console.log(`countRef.current: ${countRef.current}`);
  }

  countRef.current = count;

  const increment = () => {
    setCount(c => c + 1);
    console.log(`Message: ${message}`);
  };

  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(`Count: ${count}`);
    }, 3000);
    return () => clearInterval(id);
  }, [count]);



  return (
    <div>
      <p>{count}</p>
      <p>{message}</p>
      <section>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
}

export default Counter2;