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
import { motion } from "framer-motion";


const GridTool: React.FC = () => {
    const {params, active} = useSelector(gridSelector);
    const dispatch = useDispatch();

    return (
        // <ToolProfileBase
        //     key={"GridTool"}
        //     active={active}
        //     MainContent={() => <GridToolMain active={active} initialColor={params.color} initialNRows={params.nRows}/>}
        // />
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
                    width={50}
                    height={50}
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
            <motion.div className={"dropdownSection"}>
                <p>hi</p>
            </motion.div>
        </ToolProfileBase>
    )
}


export default GridTool;

