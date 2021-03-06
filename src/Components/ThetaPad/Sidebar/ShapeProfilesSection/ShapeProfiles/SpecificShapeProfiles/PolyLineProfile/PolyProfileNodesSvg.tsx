/** PolyProfileNodesSvg.tsx
 * @file component that represents poly-line segments and points as svg elements
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Poly} from "../../../../../../../types/shapes";
import React, {useEffect, useState} from "react";
import {unitSelector} from "../../../../../../../redux/selectors";
import {POLY_SEGMENT_HEIGHT} from "../../../../../../../constants";
import {resetUnit} from "../../../../../../../redux/slices/unitSlice";
import {removePolyPoint} from "../../../../../../../redux/slices/shapesSlice";
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "../../../../../../../hooks/reduxHooks";
import {clearHighlight, highlightPolyPointRemoval} from "../../../../../../../redux/slices/highlightSlice";

const crossVariants = {
    hidden: {
        opacity: 0,
        pathLength: 0
    },
    visible: {
        opacity: 1,
        pathLength: 1
    }
}

interface LineNodeSvgProps {
    line: Poly
}

/**
 * SVG lines and nodes representing the segments and points of a given poly shape
 * in the details dropdown of the poly-profile
 * @param {Poly} line - poly-line to display points of
 * @return {JSX.Element} - svg with mapped lines and circles. Circles have hover
 *      animations and click actions when there are more than 2 points
 */
const PolyProfileNodesSvg: React.FC<LineNodeSvgProps> = ({line}) => {
    const [focus, setFocus] = useState<null | number>(null);
    const dispatch = useAppDispatch();
    const unitData = useAppSelector(unitSelector);
    const height = POLY_SEGMENT_HEIGHT * line.points.length;
    const width = POLY_SEGMENT_HEIGHT * 1.05;
    const xLoc = POLY_SEGMENT_HEIGHT / 2;
    const yOffset = 15;
    const nodeRadius = 9;
    const nPoints = line.points.length;
    const calcYLoc = (index) => (POLY_SEGMENT_HEIGHT * index) + yOffset + nodeRadius;

    /** Update highlight state in redux when focus changes */
    useEffect(() => {
        if (focus !== null && nPoints > 2) {
            dispatch(highlightPolyPointRemoval({shapeId: line.id, subItemIndex: focus}));
        } else {
            dispatch(clearHighlight());
        }
    }, [focus, dispatch, line.id, nPoints])

    /** removes a given point from the poly-line */
    const removePoint = (index) => () => {
        if (nPoints > 2) {
            // if the point being removed is part of the unit, reset the unit
            if (unitData.unitShape === line.id) {
                if (
                    (index > 0 && line.lengths[index - 1] === unitData.unit)
                    || (index < line.points.length && line.lengths[index] === unitData.unit)
                ) { dispatch(resetUnit()) }
            }
            dispatch(removePolyPoint({target: line.id, index}))
        }
    }


    return (
        <svg
            style={{position: "absolute", right: 0, top: -nodeRadius}}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
        >
            <motion.g style={{x: -nodeRadius}}>
                <polyline
                    points={[xLoc, calcYLoc(0), xLoc, calcYLoc(line.lengths.length)].join(" ")}
                    stroke={line.color}
                    strokeWidth={4}
                    strokeLinecap={"round"}
                />
            </motion.g>
            {line.points.map((pt, index) => {
                const yLoc = calcYLoc(index);
                const isFocus = index === focus && line.points.length > 2;
                return (
                    <motion.g
                        key={"circle" + index.toString()}
                        onMouseEnter={() => {setFocus(index)}}
                        onMouseLeave={() => setFocus(null)}
                        onClick={removePoint(index)}
                        style={{x: -nodeRadius}}
                    >
                        <rect // placeholder circle for hovering
                            x={xLoc - nodeRadius}
                            y={yLoc - nodeRadius}
                            width={nodeRadius * 2.2}
                            height={nodeRadius * 2.2}
                            fill={"transparent"}
                        />
                        <motion.g
                            animate={{x: isFocus ? 20 : 0}}
                            transition={{duration: 0.6}}
                        >
                            <circle
                                cx={xLoc}
                                cy={yLoc}
                                r={nodeRadius}
                                stroke={"rgb(110, 110, 110)"}
                                strokeWidth={1}
                                fill={line.color}
                            />
                            <g>
                                <motion.path
                                    d={`M ${xLoc - nodeRadius} ${yLoc - nodeRadius}L${xLoc + nodeRadius} ${yLoc + nodeRadius}`}
                                    stroke={"rgb(255, 0, 0)"}
                                    strokeWidth={4}
                                    variants={crossVariants}
                                    initial={"hidden"}
                                    animate={isFocus ? "visible" : "hidden"}
                                    transition={{duration: 0.3, delay: 0}}
                                    strokeLinecap={"round"}
                                />
                                <motion.path
                                    d={`M ${xLoc + nodeRadius} ${yLoc - nodeRadius}L${xLoc - nodeRadius} ${yLoc + nodeRadius}`}
                                    stroke={"rgb(255, 0, 0)"}
                                    strokeWidth={4}
                                    variants={crossVariants}
                                    initial={"hidden"}
                                    animate={isFocus ? "visible" : "hidden"}
                                    transition={{duration: 0.3, delay: 0.3}}
                                    strokeLinecap={"round"}
                                />
                            </g>
                        </motion.g>
                    </motion.g>
                )
            })}
        </svg>
    )
}


export default PolyProfileNodesSvg;