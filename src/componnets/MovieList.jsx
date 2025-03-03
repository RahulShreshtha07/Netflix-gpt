import MovieCard from "./MovieCard";

const MovieList= ({title, movies})=>{
    return  (
    <div className="px-2 text-white">
        <h1 className="text-lg font-bold p-2 ">{title}</h1>
        <div className="flex overflow-x-scroll">
            <div className="flex">
                {movies?.map((movie)=> <MovieCard key={movie.id} posterPath={movie.poster_path}/>
            )}
            </div>
        </div>
    </div>);
};

export default MovieList;