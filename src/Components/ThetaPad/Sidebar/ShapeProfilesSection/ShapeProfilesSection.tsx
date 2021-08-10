/** ShapeProfilesSection.tsx
 * @file
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import {Shape, ShapeMap} from "../../types/shapes";
import CompletedShapesProfiles from "./CompletedShapesProfiles";
//import ShapeProfile from "./ShapeProfiles/ShapeProfile";
import {SHAPE_PROFILE_HEIGHT} from "../../../constants";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import ShapeProfile from "./ShapeProfiles/ShapeProfile";


const TempShapeProfile = (props) => {
    const tempShape = useSelector((state: RootState) => state.tempShape);
    const numShapes = useSelector((state: RootState) => (
        Object.keys(state.shapes).length
    ))
    return tempShape !== null && (
        <ShapeProfile shape={tempShape} index={numShapes + 1}/>
    )
}


interface ShapeProfilesSectionStyleProps {

}

const ShapeProfilesSectionRoot = styled.div<ShapeProfilesSectionStyleProps>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  flex-flow: column nowrap;
  align-items: stretch;
  padding-bottom: ${SHAPE_PROFILE_HEIGHT * 3}px;
`


interface ShapeProfilesSectionProps {}

const ShapeProfilesSection: React.FC<ShapeProfilesSectionProps> = (props) => {
    return (
        <ShapeProfilesSectionRoot>
            {/*<CompletedShapesProfiles/>*/}
            {/*{tempShape !== null && <ShapeProfile shape={tempShape} index={Object.keys(shapes).length}/>}*/}

        </ShapeProfilesSectionRoot>
    )
}

export default ShapeProfilesSection
