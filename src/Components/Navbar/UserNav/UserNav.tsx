/** UserNav.tsx
 * @file Section of Navbar dedicated to auth and user-account navigation
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {userDataSelector} from "../../../redux/selectors";
import DownloadImageButton from "./DownloadImageButton";


const UserNavRoot = styled.div`
  display: flex;
  align-items: center;
`

interface UserNavProps {
}

const UserNav: React.FC<UserNavProps> = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(userDataSelector);

//    useEffect(() => {
//        const auth = getAuth();
//        auth.onAuthStateChanged((user) => {
//            dispatch(logIn(user))
//        })
//    }, [dispatch])

    return (
        <UserNavRoot>
            <DownloadImageButton/>
            {/*{user === null ? (*/}
            {/*    <SignInButton/>*/}
            {/*) : (*/}
            {/*    <>*/}
            {/*        <UserNavMenu user={user}/>*/}
            {/*    </>*/}
            {/*)}*/}
        </UserNavRoot>
    )
}


export default UserNav;