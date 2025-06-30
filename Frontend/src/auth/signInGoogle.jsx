import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebase/config"
import axios from "axios";

const signInGoogle = async (navigate) => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const accessToken = await user.getIdToken();
        const refreshToken = user.refreshToken;

        const response = await axios.post('/api/auth/google', {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            accessToken,
            refreshToken
        },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );


        console.log(response.data);
        navigate('/dashboard', {
            state: {
                name: response.data.Name,
                email: response.data.Email,
                today: response.data.today,
                threeMonthAvg: response.data.threeMonthAvg
            }
        });

    } catch (error) {
        console.error("Error with google login", error);
    }

}

export default signInGoogle