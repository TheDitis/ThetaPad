/** ThetaPad.tsx
 * @file The root component for the actual drawing portion of the app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import Canvas from "./Canvas/Canvas";
import Sidebar from "./Sidebar/Sidebar";
import {useSelector} from "react-redux";
import {appHeightSelector} from "../../redux/selectors";

/////---------------------------------------------------------------------------
///     STYLE:
/////---------------------------------------------------------------------------

interface ThetaPadStyleProps {
    height: number;
}

const ThetaPadRoot = styled.div<ThetaPadStyleProps>`
  height: 100%;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  z-index: 100;
  background: white;
  display: flex;
`;



/////---------------------------------------------------------------------------
///     COMPONENT DEFINITION:
/////---------------------------------------------------------------------------

const ThetaPad: React.FC = () => {
    const height = useSelector(appHeightSelector);

    return (
        <ThetaPadRoot height={height}>
            <Sidebar/>
            <Canvas/>
        </ThetaPadRoot>
    )
}

export default ThetaPad;
