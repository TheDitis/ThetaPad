/** ShapeProfilesSection.tsx
 * @file
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import {ShapeMap} from "../../types/shapes";
import LineProfile from "./ShapeProfiles/LineProfile";
import uuid from "react-uuid";

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
}

const ShapeProfilesSection: React.FC<ShapeProfilesSectionProps> = (
    {shapes}
) => {
    return (
        <ShapeProfilesSectionRoot>
            {Object.entries(shapes).map(([id, shape], index) => {
                if (shape.isLine()) {
                    return <LineProfile key={uuid()} line={shape} index={index}/>
                }
                return null;
            })}
        </ShapeProfilesSectionRoot>
    )
}

export default ShapeProfilesSection;