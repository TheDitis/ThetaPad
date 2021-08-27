/** GridTool.tsx
 * @file Tool for adding a grid over images
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import ToolProfileBase from "../ToolProfileBase";
import {Button} from "@material-ui/core";
import GridIcon from "../../../../Icons/GridIcon";
import {useDispatch, useSelector} from "react-redux";
import {toggleGrid, updateGridParams} from "../../../../../redux/slices/gridSlice";
import {gridSelector} from "../../../../../redux/selectors";
import ColorSwatch from "../../../../Color/ColorSwatch";
import NumericInput from "../../../../General/NumericInput";
import NumericSlider from "../../../../General/NumericSlider";
import { motion } from "framer-motion";


const GridTool: React.FC = () => {
    const {params, active} = useSelector(gridSelector);
    const dispatch = useDispatch();

    return (
        <ToolProfileBase active={active}>
            <>
                <Button
                    className={"toolToggleButton"}
                    onClick={() => dispatch(toggleGrid())}
                >
                    <GridIcon color={active ? "white" : "black"}/>
                </Button>
                <ColorSwatch
                    color={params.color}
                    onChange={(newColor) => dispatch(updateGridParams({color: newColor}))}
                    width={45}
                    height={45}
                />
                <div className={"numericInputContainer"}>
                    <NumericInput
                        label={"Rows"}
                        onChange={(value) => dispatch(updateGridParams({nRows: value}))}
                        value={params.nRows}
                    />
                </div>
                <div className={"numericInputContainer"}>
                    <NumericInput
                        label={"Cols"}
                        onChange={(value) => dispatch(updateGridParams({nColumns: value}))}
                        value={params.nColumns}
                    />
                </div>
            </>


            <motion.div style={{width: "90%", marginTop: 10}}>
                <NumericSlider
                    value={params.opacity}
                    onChange={(val) => dispatch(updateGridParams({opacity: val}))}
                    label={"Opacity"}
                />
                <NumericSlider
                    value={params.strokeWidth}
                    onChange={(val) => dispatch(updateGridParams({strokeWidth: val}))}
                    label={"Thickness"}
                    min={1}
                    max={100}
                />
            </motion.div>

        </ToolProfileBase>
    )
}


export default GridTool;

