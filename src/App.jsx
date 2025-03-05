import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Form from './components/Form'
import MovieDisplay from './components/MovieDisplay'

function App() {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const [movie, setMovie] = useState(null);

  const movieSearch = async (searchTerm) => {
    try {
      const res = await axios(`http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`);
      setMovie(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  // ? I tried to generate a random movie from a random id but it appears that IMDB ids aren't sequential and there are a lot of ids that are either dead (deleted) or were never used in the first place making this a poor solution
  // useEffect(() => {
  //   const searchById = async(retries = 5) => {
  //     if (retries === 0) {
  //       console.error("Failed to find a valid movie after multiple attempts.");
  //       return;
  //     }

  //     const randomNumber = Math.floor(Math.random()*100000000)
  //     const movieId = randomNumber.toString().padStart(7, '0')
  
  //     try {
  //       const res = await axios(`http://www.omdbapi.com/?apikey=${apiKey}&i=tt${movieId}`);
  //       if(res.data.Error){
  //         console.warn(`Movie not found for ID tt${movieId}. Retrying...`);
  //         await searchById(retries - 1);
  //       } else {
  //         setMovie(res.data)
  //         return;
  //       }
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }

  //   searchById(10);
  // }, [])

  const defaultMovies = ['Clueless', 'Knives Out', 'Wicked', 'Paddington', 'The Holy Mountain', 'Shock Treatment' ]

  useEffect(()=>{
    const randomIdx = Math.floor(Math.random()* defaultMovies.length + 1)
    movieSearch(defaultMovies[randomIdx]);
  }, [])

  return (
    <>
      <Form movieSearch={movieSearch}/>
      <MovieDisplay movie={movie} />
    </>
  )
}

export default App
