import React, { Component, useState } from 'react';

import Counter2 from '../components/counter2';

const endpoint = 'https://star-wars-character-search.glitch.me/api';


const TestPage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    setLoading(true);
    setCharacters([]);
    setError(null);

    fetch(endpoint + '/characters')
    .then(response => response.json())
    .then(response => {
      setLoading(false);
      setCharacters(response.characters);
      console.log('jmk response.characters', response.characters)
    })
    .catch(error => {
      setLoading(false);
      setError(error);
    });
  }, []);



    return (
      <div className="Application">
        <header>
          <h1>Star Wars Characters</h1>
        </header>
        <main>
          <section className="sidebar">
            {
              loading ? (
                <p>loading...</p>
              )
              : (
                <p>Characters Loaded!</p>
              )
            }
            {error && <p className="error">{error.message}</p>}
          </section>
        </main>
      </div>
    );
  
}

export default TestPage;