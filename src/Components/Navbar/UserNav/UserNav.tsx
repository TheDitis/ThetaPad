/** UserNav.tsx
 * @file Section of Navbar dedicated to auth and user-account navigation
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {userDataSelector} from "../../../redux/selectors";
import SignInButton from "./SignInButton";
import UserNavMenu from "./UserNavMenu";
import {getAuth} from "firebase/auth";
import {logIn} from "../../../redux/slices/userSlice";


interface UserNavStyleProps {
}

const UserNavRoot = styled.div<UserNavStyleProps>`
  display: flex;
`

interface UserNavProps {
}

const UserNav: React.FC<UserNavProps> = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(userDataSelector);

    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged((user) => {
            dispatch(logIn(user))
        })
    }, [dispatch])

    return (
        <>
            {user === null ? (
                <SignInButton/>
            ) : (
                <UserNavRoot>
                    <UserNavMenu user={user}/>
                </UserNavRoot>
            )}
        </>
    )
}


export default UserNav;