/** NumericSlider.tsx
 * @file Wraps MUI Slider and just makes use less bulky
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {ChangeEvent} from "react";
import {Slider, Typography} from "@material-ui/core";


interface NumericSliderStyleProps {
}

const NumericSliderRoot = styled.div<NumericSliderStyleProps>``

interface NumericSliderProps {
    value: number;
    onChange: (val: number) => void;
    label: string;
    min?: number;
    max?: number;
    step?: number;
}

/**
 * Wraps MUI Slider and makes its use in this app less bulky
 * @param {number} value - value that this slider controls
 * @param {(val: number) => void} onChange - function to call on change
 * @param {string} label - the name of the control
 * @param {number | undefined} min - minimum possible value
 * @param {number | undefined} max - maximum possible value
 * @param {number | undefined} step - smallest increments the slider can move in
 * @return {JSX.Element} - div containing MUI slider and its label
 */
const NumericSlider: React.FC<NumericSliderProps> = ({value, onChange, label, min = 0, max = 1, step = 0.02}) => {

    const onChangeWrapper = (e: ChangeEvent<{}>, val: number | number[]) => {
        onChange(Array.isArray(val) ? val[0] : val);
    }

    return (
        <NumericSliderRoot>
            <Typography id={"opacitySlider"} gutterBottom>{label}</Typography>
            <Slider
                value={value}
                onChange={onChangeWrapper}
                aria-labelledby={"opacitySlider"}
                min={min}
                max={max}
                step={step}
            />
        </NumericSliderRoot>
    )
}


export default NumericSlider;