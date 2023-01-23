import {useEffect, useState} from 'react'
import MovieCard from './MovieCard';
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = 'https://www.omdbapi.com?apikey=7e3576af';

// const movie1 = {
//   "Title": "The Making of 'Working Title'",
//   "Year": "1992",
//   "imdbID": "tt2288099",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMTc3MjI1NzQ0NF5BMl5BanBnXkFtZTcwODg1MDI1Nw@@._V1_SX300.jpg"
// }

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search)
  }
  
  useEffect(() => {
    searchMovies('title');
  }, [])

  return (
    <div className='app'>
      <h1>Movie Fflix</h1>

      <div className='search'>
        <input 
          placeholder='Search For Movies'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      
      {movies?.length > 0 
        ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie={movie}/>
            ) )}
          </div>
          ) : (
            <div>
              <h2>No Movies Found</h2>
            </div>
          )
      }

    </div>
  )
}

export default App