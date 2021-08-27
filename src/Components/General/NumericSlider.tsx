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