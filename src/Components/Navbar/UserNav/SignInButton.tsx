/** SignInButton.tsx
 * @file Sign-in button in navbar
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Button, styled} from "@material-ui/core";
import {teal} from "@material-ui/core/colors";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {setUser} from "../../../redux/slices/userSlice";


const StyledButton = styled(Button)({
    background: teal[500],
    color: "white",
    height: 30,
    width: 80,
    borderRadius: 15,
    textTransform: "none",

    "&:hover": {
        background: teal[300]
    }
})

/*
{
    uid: string;
    displayName: string;
    email: string;
    photoURL: string
}
 */

interface SignInButtonProps {
}

const SignInButton: React.FC<SignInButtonProps> = () => {
    const dispatch = useAppDispatch();

    const signIn = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential?.accessToken;
                const user = result.user;
                dispatch(setUser(user))
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <StyledButton
            onClick={signIn}
        >
            Log In
        </StyledButton>
    )
}


export default SignInButton;