/** ShapeProfilesSection.tsx
 * @file
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import CompletedShapesProfiles from "./CompletedShapesProfiles";
import {SHAPE_PROFILE_HEIGHT} from "../../../constants";
import TempShapeProfile from "./TempShapeProfile";

const ShapeProfilesSectionRoot = styled.div`
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
  
  .profilesContainer {
    display: flex;
    flex-direction: column;
  }
`


/**
 * Section of the Sidebar that holds the profiles for all shapes
 * @return {JSX.Element} - a flex-column div taking up most of the Sidebar that
 *      holds all of the shape profiles
 */
const ShapeProfilesSection: React.FC = () => {
    return (
        <ShapeProfilesSectionRoot>
            <div className={"profilesContainer"}>
                <CompletedShapesProfiles/>
                <TempShapeProfile/>
            </div>
        </ShapeProfilesSectionRoot>
    )
}

export default ShapeProfilesSection
