/** GridTool.tsx
 * @file Tool for adding a grid over images
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import ToolProfileBase from "../ToolProfileBase";
import {Button, Slider, Typography} from "@material-ui/core";
import GridIcon from "../../../../Icons/GridIcon";
import {useDispatch, useSelector} from "react-redux";
import {toggleGrid, updateGridParams} from "../../../../../redux/slices/gridSlice";
import {gridSelector} from "../../../../../redux/selectors";
import ColorSwatch from "../../../../Color/ColorSwatch";
import NumericInput from "../../../../General/NumericInput";


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
            <>
                <div style={{width: "90%"}}>
                    <Typography id={"opacitySlider"} gutterBottom>Opacity</Typography>
                    <Slider
                        value={params.opacity}
                        onChange={(e, val) => {
                            console.log(val)
                            dispatch(updateGridParams({
                                opacity: Array.isArray(val) ? val[0] : val
                            }))
                        }}
                        aria-labelledby={"opacitySlider"}
                        min={0}
                        max={1}
                        step={0.02}
                    />
                </div>
            </>
        </ToolProfileBase>
    )
}


export default GridTool;

