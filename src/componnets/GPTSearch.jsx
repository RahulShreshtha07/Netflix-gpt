import { bg_URL } from "../utils/constants";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GPTSearchBar from "./GPTSearchBar";

const GPTSearch= ()=>{
    return (
        <>
        <div className="fixed -z-10">
            <img className="h-screen object-cover fixed md:h-auto" src= {bg_URL} 
            alt="bg-logo"
            />
            </div>
            <div className="md:pt-0">
            <GPTSearchBar/>
            <GPTMovieSuggestions/>
        </div>
        </>
  
    );
};

export default GPTSearch;