/** FiltersTool.tsx
 * @file Tool profile with controls for image filtering
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import ToolProfileBase from "../ToolProfileBase";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/reduxHooks";
import {filtersSelector, imageSrcSelector} from "../../../../../redux/selectors";
import ToggleButton from "../../../../General/ToggleButton";
import {
    filterDefaults,
    filterLimits,
    FiltersType,
    resetFilterValue,
    toggleFilter,
    updateFilterValues
} from "../../../../../redux/slices/filtersSlice";
import ImageFilterIcon from "../../../../Icons/ImageFilterIcon";
import {Brightness5, BrightnessMedium} from "@material-ui/icons";
import NumericSlider from "../../../../General/NumericSlider";
import {capitalize} from "lodash";
import {notify} from "../../../../../redux/slices/alertSlice";

const icons = {
    "contrast" : BrightnessMedium,
    "brightness": Brightness5
}

/**
 * ToolProfile for image filters
 * @return {JSX.Element} - ToolProfileBase with some sliders for filter values
 */
const FiltersTool: React.FC = () => {
    const {active, params} = useAppSelector(filtersSelector);
    const imageSrc = useAppSelector(imageSrcSelector);
    const dispatch = useAppDispatch();

    const toggleActive = () => {
        if (imageSrc !== null) {
            dispatch(toggleFilter())
        }
        else {
            dispatch(notify("Add an image to enable filters"))
        }
    }

    return (
        <ToolProfileBase active={active}>
            <>
                <ToggleButton active={active} onClick={toggleActive}>
                    <ImageFilterIcon
                        color={active ? "white" : "black"}
                    />
                </ToggleButton>
                <div style={{display: "flex", flexDirection: "column", width: 170, marginLeft: 10}}>
                    {['contrast', 'brightness'].map((param) => {
                        // const limits = filterLimits[param];
                        const Icon = icons[param];
                        // const snapThresh = Math.abs(limits[1] - limits[0]) / 20
                        return (
                            <NumericSlider
                                key={param + "MicroNumericSlider"}
                                Icon={() => (
                                    <Icon onClick={() => dispatch(resetFilterValue(param as keyof FiltersType))}/>
                                )}
                                onChange={(value) => dispatch(updateFilterValues({[param]: value}))}
                                marks={[{value: filterDefaults[param]}]}
                                value={params[param]}
                                disabled={!active}
                                step={0.005}
                                min={0.5}
                                max={1.5}
                                snapThresh={0.04}
                            />
                        )
                    })}
                </div>
            </>
            <>
                <div style={{width: "90%", display: "flex", flexDirection: "column", margin: "15px 0"}}>
                    {['saturation', 'grayscale', 'sepia', 'blur', 'hue'].map((param) => {
                        const limits = filterLimits[param];
                        const snapThresh = Math.abs(limits[1] - limits[0]) / 40;
                        return (
                            <NumericSlider
                                key={param + "MacroNumericSlider"}
                                label={capitalize(param)}
                                value={params[param]}
                                onChange={(value) => dispatch(updateFilterValues({[param]: value}))}
                                disabled={!active}
                                min={limits[0]}
                                max={limits[1]}
                                marks={[{value: filterDefaults[param]}]}
                                snapThresh={snapThresh}
                            />
                        )
                    })}
                </div>
            </>
        </ToolProfileBase>
    )
}


export default FiltersTool;