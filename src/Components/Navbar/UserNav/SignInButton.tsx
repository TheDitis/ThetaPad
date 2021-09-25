/** SignInButton.tsx
 * @file Sign-in button in navbar
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Button, styled} from "@material-ui/core";
import {teal} from "@material-ui/core/colors";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";


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


interface SignInButtonProps {
}

const SignInButton: React.FC<SignInButtonProps> = () => {

    const signIn = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            // .then((result) => {
            //     dispatch(logIn(result.user))
            // })
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