/** ShapeProfile.tsx
 * @file The base component for shape profiles in the sidebar
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useContext} from "react";
import styled from "styled-components";
import {Shape} from "../../../types/shapes";
import {SHAPE_PROFILE_HEIGHT} from "../../../../constants";
import StraightLineIcon from "../../../../Icons/StraightLineIcon";
import PolyLineIcon from "../../../../Icons/PolyLineIcon";
import {DispatchContext} from "../../../ThetaPad";
import {RemoveShapeAction} from "../../../types/actions";


interface ShapeProfileStyleProps {
    border: string;
}

const ShapeProfileRoot = styled.div<ShapeProfileStyleProps>`
  box-sizing: content-box;
  height: ${SHAPE_PROFILE_HEIGHT}px;
  background: white;
  border-radius: 10px;
  display: flex;
  padding: 0;
  margin: 5px 4px;
  color: black;

  .leftSection {
    height: ${SHAPE_PROFILE_HEIGHT}px;
    max-width: ${SHAPE_PROFILE_HEIGHT}px;

    min-width: 40px;
    border-right: 1px solid ${props => props.border};
  }

  .rightSection {
    height: ${SHAPE_PROFILE_HEIGHT}px;
    width: 100%;
  }

  .topSection {
    position: relative;
    height: 50%;
    width: 100%;
    border-bottom: 1px solid ${props => props.border};
    display: flex;
    align-items: center;

    .icon {
      border-right: 1px solid ${props => props.border};
    }
    
    h3 {
      margin-left: 20px;
    }
    
    .xButton {
      font-size: 18pt;
      position: absolute;
      right: 0.8vw;
      cursor: pointer;
      transition: transform 80ms ease-in-out;
    }
  }
`

const shapeIcons = {
    "Line": StraightLineIcon,
    "Poly": PolyLineIcon,
    // TODO: Create a circle and radius icon
}

interface ShapeProfileProps {
    shape: Shape;
    index: number;
//    children: React.FC<{key: string}>[];
}

/**
 * Basic profile to show info about a given shape
 * @param {Shape} shape - the shape to show info for
 * @param {number} index - its index in the list
 */
const ShapeProfile: React.FC<ShapeProfileProps> = ({shape, index}) => {
    const dispatch = useContext(DispatchContext);
    const borderColor = "rgba(0, 0, 0, 0.3)";
    const Icon = shapeIcons[shape.kind];

    return (
        <ShapeProfileRoot border={borderColor}>
            <div className={"leftSection"}>

            </div>
            <div className={"rightSection"}>
                <div className={"topSection"}>
                    <div className={"icon"}>
                        <Icon/>
                    </div>
                    <h3>{shape.kind} {index}</h3>
                    <p
                        className={"xButton"}
                        onClick={() => dispatch(
                            new RemoveShapeAction(shape.id)
                        )}
                    >×</p>
                </div>
                <div className={"bottomSection"}>

                </div>
            </div>
        </ShapeProfileRoot>
    );
}

export default ShapeProfile;