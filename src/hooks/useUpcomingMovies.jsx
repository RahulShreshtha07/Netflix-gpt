import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_Options } from "../utils/constants";


const useUpcomingMovies= ()=>{
    //Fetch data from TMDB API and update the store
    const dispatch= useDispatch();

    const upcomingMovie= useSelector((store)=>store.movies.upcomingMovie);

    const getUpcomingMovies= async () => {
        const data= await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_Options)

        const json= await data.json();
       dispatch(addUpcomingMovies(json.results));
                
    };

    useEffect(()=>{
        !upcomingMovie && getUpcomingMovies();

    },[])
}


export default useUpcomingMovies;