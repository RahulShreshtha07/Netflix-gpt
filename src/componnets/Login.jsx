import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { bg_URL, usericon } from "../utils/constants";

const Login= ()=>{
    
    const [isSignInForm, setIsSignInForm]= useState(true);
    const [errorMessage, setErrorMessage]= useState(null);
    const dispatch= useDispatch();

    const email= useRef(null);
    const password= useRef(null);

    const handleButtonClick= ()=>{
        //Validate the Form Data
        const message= checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if(message) return;
// Sign Up Logic
    if(!isSignInForm){
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
            displayName: name.current.value, photoURL: {usericon},
          })
          .then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(
            addUser({
                uid: uid, 
                email: email, 
                displayName: displayName, 
                photoURL: photoURL
            })
        );
          }).catch((error) => {
            setErrorMessage(error.message);
          }); 
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode+ "--" + errorMessage)
        });
        } 
    else{
// Signed in 
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
        const user = userCredential.user;
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode+"--"+ errorMessage);
        });    
        }

    };

    const toggleSignInForm= ()=>{
        setIsSignInForm(!isSignInForm);
    }

    return(
        <div>
            <Header/>
            <div className="absolute">
            <img src={bg_URL} 
            alt="bg-logo"
            />
            </div>
            <div>
                <form onSubmit={(e)=>e.preventDefault()} className="w-3/12 absolute p-12 bg-black/80 my-24 mx-auto left-0 right-0 text-white font-bold rounded-lg">
                <h1 className="font-bold text-3xl py-2">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input type="text" placeholder="Full Name" className="p-2 my-1 w-full border bg-gray-700"/>}
                <input ref={email} type="text" placeholder="Email Address" className="p-2 my-1 w-full border bg-gray-700"/>
                <input ref={password} type="password" placeholder="Password" className="p-2 my-2 w-full border bg-gray-700"/>
                    <p className="text-red-700 text-sm py-2">{errorMessage}</p>
                    <button className="cursor-pointer p-1 my-1 bg-red-800 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                    <p className="py-4 cursor-pointer text-sm" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
                </form>

            </div>
        </div>
    )
}
export default Login