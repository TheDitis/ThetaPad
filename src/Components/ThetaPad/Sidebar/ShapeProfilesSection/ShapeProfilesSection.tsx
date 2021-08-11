/** ShapeProfilesSection.tsx
 * @file
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import CompletedShapesProfiles from "./CompletedShapesProfiles";
import {SHAPE_PROFILE_HEIGHT} from "../../../constants";
import TempShapeProfile from "./TempShapeProfile";

interface ShapeProfilesSectionStyleProps {}

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
            <CompletedShapesProfiles/>
            <TempShapeProfile/>
        </ShapeProfilesSectionRoot>
    )
}

export default ShapeProfilesSection
