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
import {DispatchContext, UnitContext} from "../../../ThetaPad";
import {ChangeUnitAction, RemoveShapeAction, ResetUnitAction} from "../../../types/actions";
import ShapeInfoItem from "./ShapeInfoItem";
import uuid from "react-uuid";


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
    
    .topSection {
      position: relative;
      height: 55%;
      width: 100%;
      border-bottom: 1px solid ${props => props.border};
      display: flex;
      align-items: center;

      .icon {
        border-right: 1px solid ${props => props.border};
        height: 100%;
      }
      
      .labelAndControls {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px;
        padding-right: 10px;
        
        h3 {
          //margin-left: 20px;
          margin: 0;
          padding: 0;
        }

        .xButton {
          font-size: 18pt;
          margin: 0;
          padding: 0;
          position: relative;
          top: -5px;
          //position: absolute;
          line-height: 18pt;
          //right: 0.8vw;
          cursor: pointer;
          transition: transform 80ms ease-in-out;
        }
      }

      
    }
    
    .bottomSection {
      width: 100%;
      display: flex;
      align-items: center;
      padding-left: 5px;
      background: rgba(0, 0, 0, 0.13);
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
    infoProps: string[];
    unitValue: number;
    InfoItems?: React.FC;
    children: React.FC<{key: string}>[];
}

/**
 * Basic profile to show info about a given shape
 * @param {Shape} shape - the shape to show info for
 * @param {number} index - its index in the list
 * @param {string[]} - the array of names of shape properties you want to be
 *      shown on the bottom row of the profile
 * @param {number} unitValue - the value to set the unit to on unit button click
 */
const ShapeProfile: React.FC<ShapeProfileProps> = (
    {shape, index, infoProps, unitValue, InfoItems= () => null}
) => {
//    const unit = useContext(UnitContext);
//    const dispatch = useContext(DispatchContext);
    const borderColor = "rgba(0, 0, 0, 0.3)";
    const Icon = shapeIcons[shape.kind];

    const toggleUnit = () => {
//        if (unit === 1) {
//            dispatch(new ChangeUnitAction(unitValue));
//            shape.isUnit = true;
//        } else {
//            dispatch(new ResetUnitAction());
//            shape.isUnit = false;
//        }
    }

    return (
        <ShapeProfileRoot border={borderColor}>
            <div className={"leftSection"}>

            </div>
            <div className={"rightSection"}>
                <div className={"topSection"}>
                    <div className={"icon"}>
                        <Icon/>
                    </div>
                    <div className={"labelAndControls"}>
                        <h3>{shape.kind} {index}</h3>
                        {/*<button onClick={toggleUnit}>Unit</button>*/}

                        <h5
                            className={"xButton"}
//                            onClick={() => dispatch(
//                                new RemoveShapeAction(shape.id)
//                            )}
                        >×</h5>
                    </div>
                </div>
                <div className={"bottomSection"}>
                    <InfoItems/>
                </div>
            </div>
        </ShapeProfileRoot>
    );
}

export default ShapeProfile;

//export default React.memo(
//    ShapeProfile
//)