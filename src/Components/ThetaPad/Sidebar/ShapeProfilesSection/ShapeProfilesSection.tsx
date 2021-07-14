/** ShapeProfilesSection.tsx
 * @file
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import {ShapeMap} from "../../types/shapes";
import LineProfile from "./ShapeProfiles/LineProfile";

interface ShapeProfilesSectionStyleProps {

}

const ShapeProfilesSectionRoot = styled.div<ShapeProfilesSectionStyleProps>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-bottom: 30px;
  border: 2px solid orangered;
`


interface ShapeProfilesSectionProps {
    shapes: ShapeMap;
}

const ShapeProfilesSection: React.FC<ShapeProfilesSectionProps> = (
    {shapes}
) => {
    return (
        <ShapeProfilesSectionRoot>
            {Object.entries(shapes).map(([id, shape]) => {
                if (shape.isLine()) {
                    return <LineProfile line={shape}/>
                }
                return null;
            })}
        </ShapeProfilesSectionRoot>
    )
}

export default ShapeProfilesSection;