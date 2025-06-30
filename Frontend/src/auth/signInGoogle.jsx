import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import {auth, provider} from "../firebase/config"
import axios  from axios;

const signInGoogle = async ()=>{
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const accessToken = await user.getIdToken();
        const refreshToken = await user.refreshToken();

        //api call to backend for stroing cookies and generating the data , storing in DB
        



    } catch (error) {
        console.error("Error with google login", error);
    }
   
}

export default signInGoogle