/** UserNav.tsx
 * @file Section of Navbar dedicated to auth and user-account navigation
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {userStateSelector} from "../../../redux/selectors";
import SignInButton from "./SignInButton";
import {getAuth} from "firebase/auth";
import {logIn} from "../../../redux/slices/userSlice";
import UserNavMenu from "./UserNavMenu";


interface UserNavStyleProps {
}

const UserNavRoot = styled.div<UserNavStyleProps>`
  display: flex;
`

interface UserNavProps {
}

const UserNav: React.FC<UserNavProps> = () => {
    const userState = useAppSelector(userStateSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const auth = getAuth()
        // console.log("currentUser: ", auth.currentUser)
        auth.onAuthStateChanged((fbUser) => {
            console.log("fbUser: ", fbUser)
            dispatch(logIn(fbUser))
        })
        // signOut(auth);
    }, [dispatch])

    if (userState.user !== null) return (
        <UserNavRoot>
            <UserNavMenu user={userState.user}/>
        </UserNavRoot>
    )
    else return <SignInButton/>;
}


export default UserNav;