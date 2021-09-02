import {Poly} from "../../../../../../../types/shapes";
import React, {useState} from "react";
import {unitSelector} from "../../../../../../../redux/selectors";
import {POLY_SEGMENT_HEIGHT} from "../../../../../../../constants";
import {resetUnit} from "../../../../../../../redux/slices/unitSlice";
import {removePolyPoint} from "../../../../../../../redux/slices/shapesSlice";
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "../../../../../../../redux/hooks";

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
const PolyProfileNodesSvg: React.FC<LineNodeSvgProps> = ({line}) => {
    const [focus, setFocus] = useState<null | number>(null);
    const dispatch = useAppDispatch();
    const unitData = useAppSelector(unitSelector);
    const height = POLY_SEGMENT_HEIGHT * (line.angles.length + 1);
    const width = POLY_SEGMENT_HEIGHT;
    const xLoc = POLY_SEGMENT_HEIGHT / 2;
    const yOffset = 15;
    const nodeRadius = 9;

    const calcYLoc = (index) => (POLY_SEGMENT_HEIGHT * index) + yOffset + nodeRadius;

    const removePoint = (index) => () => {
        if (line.points.length > 2) {
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
                {line.lengths.map((pt, index) => {
                    const points = [xLoc, calcYLoc(index), xLoc, calcYLoc(index + 1)]
                    return (
                        <polyline
                            key={"line" + index.toString()}
                            points={points.join(" ")}
                            stroke={line.color}
                            strokeWidth={4}
                        />
                    )
                })}
            </motion.g>
            {line.points.map((pt, index) => {
                const yLoc = calcYLoc(index);
                const isFocus = index === focus;
                return (
                    <motion.g
                        key={"circle" + index.toString()}
                        onMouseEnter={() => setFocus(index)}
                        onMouseLeave={() => setFocus(null)}
                        onClick={removePoint(index)}
                        style={{x: -nodeRadius}}
                    >
                        <motion.rect // placeholder circle for hovering
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
                            <motion.circle
                                transition={{duration: 0.2}}
                                cx={xLoc}
                                cy={yLoc}
                                r={nodeRadius}
                                stroke={"rgb(110, 110, 110)"}
                                strokeWidth={1}
                                fill={line.color}
                            />
                            <motion.g
                                transition={{duration: 0.4}}
                            >
                                <motion.path
                                    d={`M ${xLoc - nodeRadius} ${yLoc - nodeRadius}L${xLoc + nodeRadius} ${yLoc + nodeRadius}`}
                                    stroke={"rgb(255, 0, 0)"}
                                    strokeWidth={4}
                                    variants={crossVariants}
                                    initial={"hidden"}
                                    animate={isFocus ? "visible" : "hidden"}
                                    transition={{duration: 0.3}}
                                    strokeLinecap={"round"}
                                />
                                <motion.path
                                    d={`M ${xLoc + nodeRadius} ${yLoc - nodeRadius}L${xLoc - nodeRadius} ${yLoc + nodeRadius}`}
                                    stroke={"rgb(255, 0, 0)"}
                                    strokeWidth={4}
                                    variants={crossVariants}
                                    animate={isFocus ? "visible" : "hidden"}
                                    transition={{duration: 0.3, delay: 0.2}}
                                    strokeLinecap={"round"}
                                />
                            </motion.g>
                        </motion.g>
                    </motion.g>
                )
            })}
        </svg>
    )
}


export default PolyProfileNodesSvg;