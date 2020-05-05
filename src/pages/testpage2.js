import React, { Component, useState } from 'react';

import Counter2 from '../components/counter2';

const endpoint = 'https://star-wars-character-search.glitch.me/api';

// pull this out into another file
const useFetch = url => {
  const [response, setResponse] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    setLoading(true);
    setResponse(null);
    setError(null);

    fetch(endpoint + '/characters')
      .then(response => response.json())
      .then(response => {
        setLoading(false);
        setResponse(response);
        console.log('jmk response.characters', response.characters)
      })
      .catch(error => {
        setLoading(false);
        setError(error);
      });
  }, []);

  return [response, loading, error];
}


const TestPage2 = () => {
 
  const [response, loading, error] = useFetch(endpoint + '/characters');
  const characters = (response && response.characters) || [];


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
                <div>
                  <p>Characters Loaded!</p>
                  <div style={{ display: 'flex', flexDirection: 'column'}}>
                   
                    {
                      characters.map((character) => {
                        return character.name;
                      })
                    }
                   
                  </div>
                  
                </div>
                
                
                
              )
          }
          {error && <p className="error">{error.message}</p>}
        </section>
      </main>
    </div>
  );

}

export default TestPage2;