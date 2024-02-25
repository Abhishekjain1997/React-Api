import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const[movies,setMovies]=useState([])
    const[isloading,setIsloading]=useState(false);

  async function fetchMovieHandler(){
    setIsloading(true);
    const response=await fetch('https://swapi.dev/api/films/')
    const data=await response.json();
      const transformedmovie=data.results.map(movieData=>{
        return{
          id:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date
        }
      })
      setMovies(transformedmovie);
      setIsloading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && movies.length>0 && <MoviesList movies={movies} />}
        {!isloading && movies.length===0 && <p>Found No Movie.</p>}
        {isloading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
