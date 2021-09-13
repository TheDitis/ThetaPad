/** ThetaPad.tsx
 * @file The root component for the actual drawing portion of the app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import Canvas from "./Canvas/Canvas";
import Sidebar from "./Sidebar/Sidebar";
import {appHeightSelector} from "../../redux/selectors";
import {useAppSelector} from "../../hooks/reduxHooks";


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
  overflow: hidden;
`;


/**
 * The main section of the app with all the drawing functionality
 * @return {JSX.Element} -  full-width div containing the Sidebar and Canvas
 */
const ThetaPad: React.FC = () => {
    const height = useAppSelector(appHeightSelector);

    return (
        <ThetaPadRoot height={height}>
            <Sidebar/>
            <Canvas/>
        </ThetaPadRoot>
    )
}

export default ThetaPad;
