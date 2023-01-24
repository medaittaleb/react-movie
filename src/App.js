
import './App.css';
import SearchIcon from './search.svg';
import { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';

const API_URL = 'https://www.omdbapi.com/?apikey=9094562e';

function App() {
  const [movies, setMovies] = useState([])
  const [term, setTerm] = useState('')

  const searchMovie = async (title) => {
      const res = await fetch(`${API_URL}&s=${title}`);
      const data = await res.json();
      console.log(data.Search); 
      setMovies(data.Search); 
  }

  useEffect(() => {
    searchMovie('spiderman')
  },[])

  return (
    <div className="app">
      <h1>Movie App</h1>

      <div className='search'>
        <input 
            placeholder='Search for Movies'
            value={term}
            onChange={(e) => setTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovie(term)}
          />
      </div>

      {movies?.length > 0
        ? (
          <div className='container'>
            {
              movies.map( (movie) => (
                <MovieCard movie={movie} />
              ))
            }              
          </div>
        ) : (
          <div className='empty'>
            <h2>No Movies found</h2>
          </div>
        )
      }      
    </div>
  );
}

export default App;
