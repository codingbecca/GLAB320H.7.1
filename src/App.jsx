import { useState } from 'react'
import axios from 'axios'
import './App.css'
import Form from './components/Form'
import MovieDisplay from './components/MovieDisplay'

function App() {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const [movie, setMovie] = useState(null);

  const movieSearch = async (searchTerm) => {
    const res = await axios(`http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`);
    setMovie(res.data);
  }


  return (
    <>
      <Form movieSearch={movieSearch}/>
      <MovieDisplay movie={movie} />
    </>
  )
}

export default App
