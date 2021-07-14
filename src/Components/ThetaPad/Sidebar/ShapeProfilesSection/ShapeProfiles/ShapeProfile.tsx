/** ShapeProfile.tsx
 * @file The base component for shape profiles in the sidebar
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import {Shape} from "../../../types/shapes";

interface ShapeProfileStyleProps {

}

const ShapeProfileRoot = styled.div<ShapeProfileStyleProps>`
  height: 100px;
  background: white;
  border-radius: 5px;
  display: flex;
  margin: 5px 4px;
`

interface ShapeProfileProps {
    shape: Shape;
    children: React.FC<{key: string}>[]
}

//const isNamedChild =

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

        </ShapeProfileRoot>
    )
}

export default ShapeProfile;