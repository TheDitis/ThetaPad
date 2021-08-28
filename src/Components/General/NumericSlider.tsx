/** NumericSlider.tsx
 * @file Wraps MUI Slider and just makes use less bulky
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {ChangeEvent} from "react";
import {Slider, Typography} from "@material-ui/core";


interface NumericSliderStyleProps {
}

const NumericSliderRoot = styled.div<NumericSliderStyleProps>`
  
  
`


interface NumericSliderProps {
    value: number;
    onChange: (val: number) => void;
    label: string;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
}

/**
 * Wraps MUI Slider and makes its use in this app less bulky
 * @param {number} value - value that this slider controls
 * @param {(val: number) => void} onChange - function to call on change
 * @param {string} label - the name of the control
 * @param {boolean} [disabled=false] - whether or not the input is disabled
 * @param {number} [min=0] - minimum possible value
 * @param {number} [max=1] - maximum possible value
 * @param {number} [step=0.02] - smallest increments the slider can move in
 * @return {JSX.Element} - div containing MUI slider and its label
 */
const NumericSlider: React.FC<NumericSliderProps> = (
    {
        value,
        onChange,
        label,
        disabled = false,
        min = 0,
        max = 1,
        step = 0.02
    }
) => {

    const onChangeWrapper = (e: ChangeEvent<{}>, val: number | number[]) => {
        onChange(Array.isArray(val) ? val[0] : val);
    }

    return (
        <NumericSliderRoot>
            <Typography id={"opacitySlider"} gutterBottom>{label}</Typography>
            <Slider
                className={"slider"}
                value={value}
                onChange={onChangeWrapper}
                aria-labelledby={"opacitySlider"}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
            />
        </NumericSliderRoot>
    )
}


export default NumericSlider;