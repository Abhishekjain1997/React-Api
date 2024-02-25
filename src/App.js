import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const[movies,setMovies]=useState([])
    const[isloading,setIsloading]=useState(false);
    const[error,Seterror]=useState(null);

  async function fetchMovieHandler(){
    setIsloading(true);
    Seterror(null);
    try{
      const response=await fetch('https://swapi.dev/api/films/')
      if(!response.ok){
        throw new Error('Something Went Wrong!');
      }
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
    } catch(error){
      Seterror(error.message)
    }
    setIsloading(false);
  }
  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isloading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;