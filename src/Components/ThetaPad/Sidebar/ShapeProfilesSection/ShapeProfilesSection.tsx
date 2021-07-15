/** ShapeProfilesSection.tsx
 * @file
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import {Shape, ShapeMap} from "../../types/shapes";
import LineProfile from "./ShapeProfiles/LineProfile";
import uuid from "react-uuid";
import CompletedShapesProfiles from "./CompletedShapesProfiles";


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
`


interface ShapeProfilesSectionProps {
    shapes: ShapeMap;
    tempShape: Shape | null;
}

const ShapeProfilesSection: React.FC<ShapeProfilesSectionProps> = (
    {shapes, tempShape}
) => {
    return (
        <ShapeProfilesSectionRoot>
            <CompletedShapesProfiles shapes={shapes}/>
            {/*TODO: REFACTOR THIS ONCE OTHER DRAW MODES WORK*/}
            {tempShape !== null && tempShape.isLine() && <LineProfile key={uuid()} line={tempShape} index={Object.keys(shapes).length}/>}
        </ShapeProfilesSectionRoot>
    )
}

export default ShapeProfilesSection
