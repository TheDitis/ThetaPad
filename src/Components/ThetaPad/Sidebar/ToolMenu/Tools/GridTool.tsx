/** GridTool.tsx
 * @file Tool for adding a grid over images
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useEffect} from "react";
import ToolProfileBase from "../ToolProfileBase";
import GridIcon from "../../../../Icons/GridIcon";
import {GridOrientation, toggleGrid, updateGridParams} from "../../../../../redux/slices/gridSlice";
import {gridSelector} from "../../../../../redux/selectors";
import ColorSwatch from "../../../../Color/ColorSwatch";
import NumericInput from "../../../../General/NumericInput";
import NumericSlider from "../../../../General/NumericSlider";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/reduxHooks";
import styled from "styled-components";
import ToggleButton from "../../../../General/ToggleButton";
import {recalculateDimensions} from "../../../../../redux/slices/dimensionsSlice";


const DetailsSectionRoot = styled.div`
  width: 90%;
  margin-top: 10px;
  
  .orientationsControl {
    margin: 10px 0;
    
    .orientationButtonRow {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: 15px 0;

      .toggleButton {
        width: 30px;
        height: 30px;
        padding: 0;
      }
    }
  }
  
`

/**
 * Tool with all grid controls
 * @return {JSX.Element} - ToolProfileBase with nested Grid parameters
 */
const GridTool: React.FC = () => {
    const {params, active} = useAppSelector(gridSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (active) {
            dispatch(recalculateDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            }))
        }
    }, [dispatch, active])

    const toggleOrientation = (orientation: GridOrientation) => {
        dispatch(updateGridParams({
            orientations: {...params.orientations, [orientation]: !params.orientations[orientation]}
        }))
    }

    return (
        <ToolProfileBase active={active}>
            <>
                <ToggleButton active={active} onClick={() => dispatch(toggleGrid())} style={{marginRight: 10}}>
                    <GridIcon
                        color={active ? "white" : "black"}
                        allOrientations={false}
                        {...params.orientations}
                        strokeWidth={23}
                    />
                </ToggleButton>
                <ColorSwatch
                    color={params.color}
                    onChange={(newColor) => dispatch(updateGridParams({color: newColor}))}
                    width={45}
                    height={45}
                    disabled={!active}
                />
                <div className={"numericInputContainer"}>
                    <NumericInput
                        label={"Rows"}
                        onChange={(value) => dispatch(updateGridParams({nRows: value}))}
                        value={params.nRows}
                        disabled={!active}
                    />
                </div>
                <div className={"numericInputContainer"}>
                    <NumericInput
                        label={"Cols"}
                        onChange={(value) => dispatch(updateGridParams({nColumns: value}))}
                        value={params.nColumns}
                        disabled={!active}
                    />
                </div>
            </>


            <DetailsSectionRoot>
                <NumericSlider
                    value={params.opacity}
                    onChange={(val) => dispatch(updateGridParams({opacity: val}))}
                    label={"Opacity"}
                    disabled={!active}
                />
                <NumericSlider
                    value={params.strokeWidth}
                    onChange={(val) => dispatch(updateGridParams({strokeWidth: val}))}
                    label={"Thickness"}
                    disabled={!active}
                    min={1}
                    max={10}
                />
                <div className={"orientationsControl"}>
                    <p>Orientations</p>
                    <div className={"orientationButtonRow"}>
                        {Object.keys(params.orientations).map((orientation) => (
                            <ToggleButton
                                key={orientation + "GridToggleButton"}
                                active={params.orientations[orientation]}
                                disabled={!active}
                                onClick={() => toggleOrientation(orientation as GridOrientation)}
                                style={{width: 30, height: 30}}
                            >
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
                </div>
            </DetailsSectionRoot>

        </ToolProfileBase>
    )
}


export default GridTool;

