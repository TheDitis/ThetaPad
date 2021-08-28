/** GridTool.tsx
 * @file Tool for adding a grid over images
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import ToolProfileBase from "../ToolProfileBase";
import {Button} from "@material-ui/core";
import GridIcon from "../../../../Icons/GridIcon";
import {GridOrientation, toggleGrid, updateGridParams} from "../../../../../redux/slices/gridSlice";
import {gridSelector} from "../../../../../redux/selectors";
import ColorSwatch from "../../../../Color/ColorSwatch";
import NumericInput from "../../../../General/NumericInput";
import NumericSlider from "../../../../General/NumericSlider";
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import styled from "styled-components";
import ToggleButton from "../../../../General/ToggleButton";


// const gridOrientationIcons = {
//     vertical: GridVerticalIcon,
//     horizontal: GridHorizontalIcon,
//     incline: GridInclineIcon,
//     decline: GridDeclineIcon,
// }

const DetailsSectionRoot = styled.div`
  width: 90%;
  margin-top: 10px;
  
  .orientationButtonSection {
    display: flex;
    justify-content: space-between;
    width: 100%;
    
    .toggleButton {
      width: 30px;
      height: 30px;
      padding: 0;
      //margin: 20px;
    }
  }
`


const GridTool: React.FC = () => {
    const {params, active} = useAppSelector(gridSelector);
    const dispatch = useAppDispatch();

    const toggleOrientation = (orientation: GridOrientation) => {
        dispatch(updateGridParams({
            orientations: {...params.orientations, [orientation]: !params.orientations[orientation]}
        }))
        console.log(params.orientations)
    }

    return (
        <ToolProfileBase active={active}>
            <>
                <ToggleButton active={active} onClick={() => dispatch(toggleGrid())} style={{marginRight: 10}}>
                    <GridIcon
                        color={active ? "white" : "black"}
                        allOrientations={false}
                        {...params.orientations}
                    />
                </ToggleButton>
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


            <DetailsSectionRoot>
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
                <div className={"orientationButtonSection"}>
                    {Object.keys(params.orientations).map((orientation) => (
                        // <Button
                        //     key={orientation + "GridToggleButton"}
                        //     className={"toggleButton"}
                        //     style={{
                        //         backgroundColor: params.orientations[orientation] ? "hsl(197,16%,18%)" : "white",
                        //     }}
                        //     onClick={() => toggleOrientation(orientation as GridOrientation)}
                        // >
                        //     <GridIcon
                        //         color={params.orientations[orientation] ? "white" : "black"}
                        //         width={25}
                        //         height={25}
                        //         allOrientations={false}
                        //         {...{[orientation]: true}}
                        //         strokeWidth={50}
                        //     />
                        // </Button>
                        <ToggleButton
                            key={orientation + "GridToggleButton"}
                            active={params.orientations[orientation]}
                            onClick={() => toggleOrientation(orientation as GridOrientation)}
                            // style={{width: 30, height: 30}}
                        >
                            {/*{orientation}*/}
                            <GridIcon
                                color={params.orientations[orientation] ? "white" : "black"}
                                width={25}
                                height={25}
                                allOrientations={false}
                                {...{[orientation]: true}}
                                strokeWidth={50}
                            />
                        </ToggleButton>
                    ))}
                </div>
            </DetailsSectionRoot>

        </ToolProfileBase>
    )
}


export default GridTool;

