import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_Options } from "../utils/constants";


const useNowPlayingMovies= ()=>{
    //Fetch data from TMDB API and update the store
    const dispatch= useDispatch();

    const nowPlayingMovies= useSelector((store)=>store.movies.nowPlayingMovies);

    const getNowPlayingMovies= async () => {
        const data= await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", API_Options);

        const json= await data.json();
       dispatch(addNowPlayingMovies(json.results));
                
    };

    useEffect(()=>{
        !nowPlayingMovies && getNowPlayingMovies();

    },[])
}


export default useNowPlayingMovies;