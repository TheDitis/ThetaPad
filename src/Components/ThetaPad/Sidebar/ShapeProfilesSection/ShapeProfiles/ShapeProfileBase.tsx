/** ShapeProfileBase.tsx
 * @file The base component for shape profiles in the sidebar
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import {Shape} from "../../../../../types/shapes";
import {SHAPE_PROFILE_HEIGHT} from "../../../../constants";
import StraightLineIcon from "../../../../Icons/StraightLineIcon";
import PolyLineIcon from "../../../../Icons/PolyLineIcon";
import CircleIcon from "../../../../Icons/CircleIcon";
import {useDispatch, useSelector} from "react-redux";
import {removeShape} from "../../../../../redux/slices/shapesSlice";
import {unitSelector} from "../../../../../redux/selectors";
import {resetUnit, setUnit} from "../../../../../redux/slices/unitSlice";


interface ShapeProfileStyleProps {
    isUnit: boolean;
    border?: string;
}

const borderColor = "rgba(0, 0, 0, 0.3)";

const ShapeProfileRoot = styled.div<ShapeProfileStyleProps>`
  box-sizing: border-box;
  height: ${SHAPE_PROFILE_HEIGHT}px;
  background: white;
  border-radius: 10px;
  display: flex;
  margin: 5px 4px;
  color: black;

  .leftSection {
    height: ${SHAPE_PROFILE_HEIGHT}px;
    max-width: ${SHAPE_PROFILE_HEIGHT}px;

    min-width: 40px;
    border-right: 1px solid ${borderColor};
  }

  .rightSection {
    height: ${SHAPE_PROFILE_HEIGHT}px;
    width: 100%;

    .topSection {
      position: relative;
      height: ${SHAPE_PROFILE_HEIGHT * 0.55}px;
      width: 100%;
      border-bottom: 1px solid ${borderColor};
      display: flex;
      align-items: center;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid ${borderColor};
        height: 100%;
      }

      .labelAndControls {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 15px;
        padding-right: 10px;

        .unitButton {
          color: ${props => props.isUnit ? "white" : "black"};
          display: flex;
          font-size: 9pt;
          border: 1px solid gray;
          padding: 4px 8px 2px 8px;
          border-radius: 8px;
          background: ${props => props.isUnit ? "rgb(75, 75, 75)" : "white"};
        }

        .xButton {
          font-size: 15pt;
          position: relative;
          top: -5px;
          line-height: 18pt;
          cursor: pointer;
          transition: transform 80ms ease-in-out;
        }
      }
    }

    .bottomSection {
      width: 100%;
      height: ${SHAPE_PROFILE_HEIGHT * 0.45}px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 5px;
      background: rgba(0, 0, 0, 0.13);
    }
  }
`

const shapeIcons = {
    "Line": StraightLineIcon,
    "Poly": PolyLineIcon,
    "Circle": CircleIcon,
}

interface ShapeProfileProps {
    shape: Shape;
    index: number;
    unitValue: number;
    InfoItems?: React.FC;
    children?: React.FC<{ key: string }>[];
}

/**
 * Basic profile to show info about a given shape
 * @param {Shape} shape - the shape to show info for
 * @param {number} index - its index in the list
 * @param {number} unitValue - the value to set the value to on value button click
 * @param InfoItems - The info component to show in the lower row if any
 */
const ShapeProfileBase: React.FC<ShapeProfileProps> = (
    {shape, index, unitValue, InfoItems = () => null}
) => {
    const unit = useSelector(unitSelector);

    const dispatch = useDispatch();
    const Icon = shapeIcons[shape.kind];

    const toggleUnit = () => {
        if (shape.id !== unit.unitShape) {
            dispatch(setUnit({value: unitValue, id: shape.id}));
        }
        else {
            dispatch(resetUnit());
        }
    }

    return (
        <ShapeProfileRoot isUnit={shape.id === unit.unitShape}>
            <div className={"leftSection"}>

            </div>
            <div className={"rightSection"}>
                <div className={"topSection"}>
                    <div className={"icon"}>
                        <Icon/>
                    </div>
                    <div className={"labelAndControls"}>
                        <h3>{shape.kind} {index}</h3>
                        <button
                            className={"unitButton"}
                            onClick={toggleUnit}
                        >Unit
                        </button>

                        <h5
                            className={"xButton"}
                            onClick={() => dispatch(removeShape(shape.id))}
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
export default ShapeProfileBase;