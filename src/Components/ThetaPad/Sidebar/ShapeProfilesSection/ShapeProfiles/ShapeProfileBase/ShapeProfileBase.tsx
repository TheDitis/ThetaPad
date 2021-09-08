/** ShapeProfileBase.tsx
 * @file The base component for shape profiles in the sidebar
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useState} from "react";
import styled from "styled-components";
import {Shape} from "../../../../../../types/shapes";
import {SHAPE_PROFILE_HEIGHT} from "../../../../../../constants";
import StraightLineIcon from "../../../../../Icons/StraightLineIcon";
import PolyLineIcon from "../../../../../Icons/PolyLineIcon";
import CircleIcon from "../../../../../Icons/CircleIcon";
import {removeShape, updateShape} from "../../../../../../redux/slices/shapesSlice";
import {unitSelector} from "../../../../../../redux/selectors";
import ColorSwatch from "../../../../../Color/ColorSwatch";
import {AnimatePresence, motion} from "framer-motion";
import ShowMoreButton from "../../../../../General/ShowMoreButton";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/hooks";
import {IconButton} from "@material-ui/core";
import {VisibilityOffOutlined, VisibilityOutlined} from "@material-ui/icons";
import ShapeNameField from "./ShapeNameField";
import ShapeInfoItem from "../ShapeInfoItem";


interface ShapeProfileStyleProps {
    isUnit: boolean;
    isVisible: boolean;
}

const borderColor = "rgba(0, 0, 0, 0.3)";


const ShapeProfileRoot = styled(motion.div)<ShapeProfileStyleProps>`
  box-sizing: border-box;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 5px 4px;
  color: black;
  overflow: hidden;
  min-height: ${SHAPE_PROFILE_HEIGHT}px;
  
  
  .main {
    display: flex;
    height: ${SHAPE_PROFILE_HEIGHT}px;
    
    .leftSection {
      height: ${SHAPE_PROFILE_HEIGHT}px;
      max-width: ${SHAPE_PROFILE_HEIGHT}px;
      min-width: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
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
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 0;
          padding-right: 10px;
          
          h3 {
            opacity: ${({isVisible}) => isVisible ? 1 : 0.4};
          }
          
          .visibilityButton {
            height: 35px;
            width: 35px;
            font-size: 17pt;
            margin-right: 12px;
          }

          .unitButton {
            color: ${props => props.isUnit ? "white" : "black"};
            display: flex;
            font-size: 9pt;
            border: 1px solid gray;
            padding: 4px 8px 2px 8px;
            margin-left: 4px;
            margin-right: 5px;
            border-radius: 8px;
            background: ${props => props.isUnit ? "rgb(75, 75, 75)" : "white"};
            opacity: ${({isVisible}) => isVisible ? 1 : 0.6};
          }

          .xButton {
            font-size: 15pt;
            position: absolute;
            top: 4px;
            right: 7px;
            line-height: 18pt;
            cursor: pointer;
            color: black;
            transition: color 300ms ease-in-out, transform 300ms ease-in-out;
            
            &:hover {
              color: rgb(150, 0, 0);
              transform: scale(1.2);
            }
          }
        }
      }

      .bottomSection {
        width: 100%;
        height: ${SHAPE_PROFILE_HEIGHT * 0.45}px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 5px;
        padding-right: 10px;
        background: rgba(0, 0, 0, 0.13);

        .infoRow {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
      }
    }
  }

  .details {
    max-height: ${SHAPE_PROFILE_HEIGHT * 3.5}px;
    overflow: scroll;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.6) inset;
    background: rgba(0, 0, 0, 0.13);
    
    .detailsScrollContainer {
      width: 100%;
    }
  }
`

const shapeIcons = {
    "Line": StraightLineIcon,
    "Poly": PolyLineIcon,
    "Circle": CircleIcon,
}

const variants = {
    // disabled main fade for now
    main: {
        visible: {
            opacity: 1,
        },
        hidden: {
            opacity: 0,
        }
    },
    details: {
        open: {
            margin: 0,
            padding: 0,
            height: "auto", // SHAPE_PROFILE_HEIGHT * 3
            minHeight: SHAPE_PROFILE_HEIGHT * 1.2
        },
        closed: {
            margin: 0,
            padding: 0,
            height: 0,
            minHeight: 0,
        }
    }
}


interface ShapeProfileProps {
    shape: Shape;
    index: number;
    unitValue: number;
    infoItems: string[];
    DetailsSection?: React.FC;
    fadeIn?: boolean;
}

/**
 * Basic profile to show info about a given shape.
 * @param {Shape} shape - the shape to show info for
 * @param {number} index - its index in the list
 * @param {number} unitValue - the value to set the unit to on unit button click
 * @param {string[]} [infoItems=[]] - the info component to show in the lower row
 * @param {React.FC} [DetailsSection] - component to render in the dropdown, showing more details/controls for the shape
 * @param {boolean} [fadeIn=false] - whether or not the profile should animate in
 */
const ShapeProfileBase: React.FC<ShapeProfileProps> = (
    {
        shape,
        index,
        infoItems = [],
        fadeIn = false,
        children
    }
) => {
    const unit = useAppSelector(unitSelector);
    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useAppDispatch();
    const Icon = shapeIcons[shape.kind];


    const toggleVisibility = () => {
        dispatch(updateShape({
            target: shape.id,
            newValues: {visible: !shape.visible}
        }))
    }

    const changeColor = (color: string) => {
        dispatch(updateShape({target: shape.id, newValues: {color}}))
    }

    return (
        <ShapeProfileRoot
            isUnit={shape.id === unit.unitShape}
            isVisible={shape.visible}
            variants={variants.main}
            initial={fadeIn ? "hidden" : "visible"}
            animate={"visible"}
        >
            <div className={"main"}>
                <div className={"leftSection"}>
                    <ColorSwatch color={shape.color} onChange={changeColor}/>
                </div>
                <div className={"rightSection"}>
                    <div className={"topSection"}>
                        <div className={"icon"}>
                            <Icon/>
                        </div>
                        <div className={"labelAndControls"}>
                            <ShapeNameField shape={shape} index={index} disabled={!shape.visible}/>

                            <IconButton
                                className={"visibilityButton"}
                                onClick={toggleVisibility}
                            >
                                {shape.visible
                                    ? <VisibilityOutlined fontSize={"inherit"}/>
                                    : <VisibilityOffOutlined fontSize={"inherit"}/>
                                }
                            </IconButton>

                            <h5
                                className={"xButton"}
                                onClick={() => dispatch(removeShape(shape.id))}
                            >×</h5>
                        </div>
                    </div>
                    <div className={"bottomSection"}>
                        <div className={"infoRow"}>
                            {infoItems.map((propName) => (
                                <ShapeInfoItem shape={shape} property={propName} key={propName}/>
                            ))}
                        </div>
                        {children !== undefined && (
                            <ShowMoreButton
                                onClick={() => setShowDetails(!showDetails)}
                                isOpen={showDetails}
                            />
                        )}
                    </div>
                </div>
            </div>
            {children !== undefined && (
                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            className={"details"}
                            variants={variants.details}
                            initial={"closed"}
                            exit={"closed"}
                            animate={"open"}
                        >
                            {/*<div className={"detailsScrollContainer"}>*/}
                            {children}
                            {/*</div>*/}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </ShapeProfileRoot>
    );
}
export default ShapeProfileBase
