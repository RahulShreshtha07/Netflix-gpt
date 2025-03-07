import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer= ()=>{
    const movies= useSelector((store)=>store.movies);
    
    return (  
        movies.nowPlayingMovies &&(
    <div className="bg-black">
        <div className="-mt-60 pl-8 relative z-20 ">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
        <MovieList title={"Horror Movies"} movies={movies.nowPlayingMovies} />
        </div>
    </div>
    )
    );
};

export default SecondaryContainer;