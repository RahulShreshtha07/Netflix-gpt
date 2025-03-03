import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_Options } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";


const useTopRatedMovies= ()=>{
    //Fetch data from TMDB API and update the store
    const dispatch= useDispatch();

    const topRatedMovies= useSelector((store)=>store.movies.topRatedMovies);

    const getTopRatedMovies= async () => {
        const data= await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_Options);

        const json= await data.json();
       dispatch(addTopRatedMovies(json.results));
                
    };

    useEffect(()=>{
        !topRatedMovies && getTopRatedMovies();

    },[])
}


export default useTopRatedMovies;