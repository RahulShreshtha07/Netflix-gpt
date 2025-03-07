import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, usericon } from "../utils/constants";
import { toggleGptSearchView } from "../utils/GPTSlice";
import { changeLanguage } from "../utils/configSlice";

const Header= ()=>{
    const dispatch= useDispatch();
    const navigate= useNavigate()
    const user= useSelector((store)=> store.user);
    const showGptSearch= useSelector((store)=>store.gpt.showGptSearch)
    const handleSignOut= ()=>{
        signOut(auth).then(() => {})
        .catch((error) => {
            navigate("/error");
          });
    }; 

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid, email, displayName, photoURL} = user;
              dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
              navigate("/browse");
            } else {
              dispatch(removeUser());
              navigate("/");
            }
          });
          //unsubscribe when component unmounts onAuthStateChanged returns a unsubscribe function
          return ()=>unsubscribe();    
    }, []);

          const handleGptSearchClick=()=>{
            dispatch(toggleGptSearchView());
          };

          const handleLanguageChange= (e)=>{
            dispatch(changeLanguage(e.target.value));
          }

    return(
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
            <img className="w-44 mx-auto md:mx-0"
            src={LOGO} alt="logo"/>            
            {user &&(<div className="flex  p-2">
              {showGptSearch && (<select className="py-0.5 px-1 text-white mx-14 my-12 bg-gray-900 rounded-lg relative bottom-1 mt-1 cursor-pointer left-34 text-xs"
              onChange={handleLanguageChange}>
                {SUPPORTED_LANGUAGES.map((lang)=>(
                    <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                ))}
              </select>)}
              <button className="py-1 px-2 text-white mx-14 my-12 bg-purple-700 rounded-lg relative bottom-1 mt-1 left-12 cursor-pointer"
              onClick={handleGptSearchClick}>{showGptSearch ? "Homepage" : "GPT Search"}</button>
                <img className="size-8" alt="usericon" src={usericon}/>
                <button onClick={handleSignOut} className="font-bold text-white cursor-pointer relative bottom-10 mt-4 left-1">Sign Out</button>
            </div>
            )}
        </div>
    )
}
export default Header;