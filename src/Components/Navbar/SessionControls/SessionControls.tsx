/** SessionControls.tsx
 * @file Navbar component of the app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {imageSelector, sessionSelector, userDataSelector} from "../../../redux/selectors";
import styled from "styled-components";

const SessionControlsRoot = styled.div`
  
`

const SessionControls = () => {
    const image = useAppSelector(imageSelector);
    const user = useAppSelector(userDataSelector);
    const session = useAppSelector(sessionSelector);
    const dispatch = useAppDispatch();

    if (image.uri !== null && user !== null) return (
        <SessionControlsRoot>

        </SessionControlsRoot>
    )
}



export default SessionControls;