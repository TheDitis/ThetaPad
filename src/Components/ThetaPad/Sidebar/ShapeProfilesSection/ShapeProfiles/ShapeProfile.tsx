/** ShapeProfile.tsx
 * @file The base component for shape profiles in the sidebar
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import {Shape} from "../../../types/shapes";
import {SHAPE_PROFILE_HEIGHT} from "../../../../constants";

interface ShapeProfileStyleProps {

}

const ShapeProfileRoot = styled.div<ShapeProfileStyleProps>`
  height: ${SHAPE_PROFILE_HEIGHT}px;
  background: white;
  border-radius: 5px;
  display: flex;
  margin: 5px 4px;

  .leftSection {
    height: ${SHAPE_PROFILE_HEIGHT}px;
    width: ${SHAPE_PROFILE_HEIGHT}px;
    border-right: 2px solid gray;
  }
`

interface ShapeProfileProps {
    shape: Shape;
    children: React.FC<{key: string}>[]
}


const ShapeProfile: React.FC<ShapeProfileProps> = ({shape, children}) => {
//    const getComponent = (key) => {
//        if (Array.isArray(children)) {
//            return children.filter((comp) => {
//                return (comp) ? comp.key === key : null;
//            })
//        }
//    };

    return (
        <ShapeProfileRoot>
            <div className={"leftSection"}>

            </div>
            <div className={"rightSection"}>
                <div className={"topSection"}>

                </div>
                <div className={"bottomSection"}>

                </div>
            </div>
        </ShapeProfileRoot>
    )
}

export default ShapeProfile;