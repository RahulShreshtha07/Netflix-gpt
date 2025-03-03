import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestions= ()=>{
    const gpt= useSelector((store)=>store.gpt);
    const{movieResults, movieNames}= gpt;
    console.log(movieResults);
    console.log(movieNames);
    if(!movieNames) return null;

    return (
        <div className='p-4 m-4 bg-black/80 text-white'>
          {movieNames.map((movieName, index) => <MovieList key={movieName} title={movieName} movies = {movieResults[index]} />)}  
        </div>
      )
    }

export default GPTMovieSuggestions;