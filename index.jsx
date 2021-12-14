import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import ReactBootstrap from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '/public/index.html'
import 'index.js';

function App() {
  const { Container } = ReactBootstrap;
  const { useState, useEffect } = React;
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("reactCheatsheet");
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=react/cheatsheet" // i am going to retriev the 1 page of react cheat sheets.
  );
  const [isLoading, setIsLoading] = React.useState(false);
  console.log("Rendering App");
  
  useEffect(() => {   // Handles the LifeCycle Events
    console.log("Fetching data...");
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);
  return (
    <Container>
      <form
        onSubmit={event => {
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);

          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));
