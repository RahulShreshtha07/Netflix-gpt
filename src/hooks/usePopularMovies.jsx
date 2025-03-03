import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_Options } from "../utils/constants";


const usePopularMovies= ()=>{
    //Fetch data from TMDB API and update the store
    const dispatch= useDispatch();

    const popularMovies= useSelector((store)=>store.movies.popularMovies);

    const getPopularMovies= async () => {
        const data= await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_Options);

        const json= await data.json();
       dispatch(addPopularMovies(json.results));
                
    };

    useEffect(()=>{
        !popularMovies && getPopularMovies();

    },[])
}


export default usePopularMovies;