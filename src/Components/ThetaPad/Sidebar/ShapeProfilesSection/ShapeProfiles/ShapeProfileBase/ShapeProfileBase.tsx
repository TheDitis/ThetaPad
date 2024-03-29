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
import {useAppDispatch, useAppSelector} from "../../../../../../hooks/reduxHooks";
import {IconButton} from "@material-ui/core";
import {VisibilityOffOutlined, VisibilityOutlined} from "@material-ui/icons";
import ShapeNameField from "./ShapeNameField";
import ShapeInfoItem from "../ShapeInfoItem";
import {updateTempShape} from "../../../../../../redux/slices/tempShapeSlice";


interface ShapeProfileStyleProps {
    isUnit: boolean;
    borderColor: string;
    isVisible: boolean;
}




const ShapeProfileRoot = styled(motion.div)<ShapeProfileStyleProps>`
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  background: ${({isUnit}) => (isUnit ? "hsl(235, 15%, 35%)" : "white")};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 5px 4px;
  overflow: hidden;
  min-height: ${SHAPE_PROFILE_HEIGHT}px;
  color: ${({isUnit}) => isUnit ? "white" : "black"};
  
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
      border-right: 1px solid ${({borderColor}) => borderColor};
    }

    .rightSection {
      height: ${SHAPE_PROFILE_HEIGHT}px;
      width: 100%;

      .topSection {
        position: relative;
        height: ${SHAPE_PROFILE_HEIGHT * 0.55}px;
        width: 100%;
        border-bottom: 1px solid ${({borderColor}) => borderColor};
        display: flex;
        align-items: center;

        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid ${({borderColor}) => borderColor};
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
            color: ${({isUnit}) => isUnit ? "white" : "rgba(0, 0, 0, 0.6)"};
          }

          .xButton {
            font-size: 15pt;
            position: absolute;
            top: 4px;
            right: 7px;
            line-height: 18pt;
            cursor: pointer;
            color: ${({isUnit}) => isUnit ? "white" : "rgba(0, 0, 0, 0.6)"};
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
    isTemp?: boolean;
}

/**
 * Basic profile to show info about a given shape.
 * @param {Shape} shape - the shape to show info for
 * @param {number} index - its index in the list
 * @param {number} unitValue - the value to set the unit to on unit button click
 * @param {string[]} [infoItems=[]] - the info component to show in the lower row
 * @param {boolean} [isTemp=false] - whether or not the profile should animate in
 */
const ShapeProfileBase: React.FC<ShapeProfileProps> = (
    {
        shape,
        index,
        infoItems = [],
        isTemp = false,
        children
    }
) => {
    const unit = useAppSelector(unitSelector);
    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useAppDispatch();
    const Icon = shapeIcons[shape.kind];
    const isUnit = unit.unitShape === shape.id;

    const toggleVisibility = () => {
        dispatch(updateShape({
            target: shape.id,
            newValues: {visible: !shape.visible}
        }))
    }

    const changeColor = (color: string) => {
        if (isTemp) {
            dispatch(updateTempShape({color}))
        }
        else {
            dispatch(updateShape({target: shape.id, newValues: {color}}))
        }
    }

    return (
        <ShapeProfileRoot
            isUnit={isUnit}
            borderColor={isUnit ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.3)"}
            isVisible={shape.visible}
            variants={variants.main}
            initial={isTemp ? "hidden" : "visible"}
            animate={"visible"}
        >
            <div className={"main"}>
                <div className={"leftSection"}>
                    <ColorSwatch color={shape.color} onChange={changeColor}/>
                </div>
                <div className={"rightSection"}>
                    <div className={"topSection"}>
                        <div className={"icon"}>
                            <Icon color={isUnit ? "white" : "black"}/>
                        </div>
                        <div className={"labelAndControls"}>
                            <ShapeNameField
                                shape={shape}
                                index={index}
                                disabled={!shape.visible}
                                color={isUnit ? "white" : "black"}
                            />

                            <IconButton
                                className={"visibilityButton"}
                                onClick={toggleVisibility}
                            >
                                {shape.visible
                                    ? <VisibilityOutlined
                                        fontSize={"inherit"}
                                        color={"inherit"}
                                    />
                                    : <VisibilityOffOutlined
                                        fontSize={"inherit"}
                                        color={"inherit"}
                                    />
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
                                <ShapeInfoItem
                                    key={propName}
                                    shape={shape}
                                    property={propName}
                                />
                            ))}
                        </div>
                        {children !== undefined && !isTemp && (
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
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </ShapeProfileRoot>
    );
}
export default ShapeProfileBase
