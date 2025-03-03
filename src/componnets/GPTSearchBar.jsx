import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { API_OPTION, GEMINI_KEY, GEMINI_URL } from '../utils/constants';
import { addSuggestedMovies } from "../utils/GPTSlice";


const GPTSearchBar= ()=>{

    const langKey= useSelector((store)=>store.config.lang)
    const searchText= useRef(null);
    const dispatch = useDispatch();

    const searchMovieTmdb = async(movie) => {
      const encodedData = movie.replace(/ /g, "%20");
      const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + encodedData +"&include_adult=false&language=en-US&page=1", API_OPTION);
      const json = await data.json();
      return json.results;
    }

    const handleGptSearchCLick=async()=>{
        
    console.log(searchText.current.value);

    const gptQuery= "Act as a Movie recommendation system and suggest some movies fot the query: "+ searchText.current.value +". Only givr me names of 5 movies, comma seprated like the example result given ahead. Expamle Results: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
    const url = GEMINI_URL + GEMINI_KEY;
    const payload = {
      contents: [{
        parts: [{"text": gptQuery}]
      }]
    };
  
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
  
      const json = await res.json();
      let gptMovies =json.candidates[0].content.parts[0].text ? json.candidates[0].content.parts[0].text.split(',') : "";
      if (Array.isArray(gptMovies) && gptMovies.length > 0) {
        // Remove newline from the last element
        gptMovies[gptMovies.length - 1] = gptMovies[gptMovies.length - 1].trim();
      
        // remove extra spaces and tabs
        gptMovies = gptMovies.map((movie) => movie.trim());
      
        // Convert the array to a comma-separated string
        const movieString = gptMovies.join(', ');
      
        console.log(movieString);
      } else {
        console.log("");
      }

      // for each movie i will search tmdb api 

      const promiseArray =  gptMovies.map(movie => searchMovieTmdb(movie.trim())); 
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(addSuggestedMovies({movieNames: gptMovies,movieResults: tmdbResults}));
      console.log(gptMovies);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  if(searchText.current){
      handleGptSearchCLick();
  }

    return (
        <div className="pt-[60%]  md:pt-[13%] justify-center flex">
            <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=>e.preventDefault()}>
                <input ref={searchText} type="text" className="px-10 py-2 m-4 bg-white text-black col-span-10" 
                placeholder={lang[langKey].gptSearchPlaceholder} />
                <button className="py-2 px-4 bg-red-700 text-white rounded-lg col-span-2 m-2 cursor-pointer"
                onClick={handleGptSearchCLick}>
                {lang[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GPTSearchBar;