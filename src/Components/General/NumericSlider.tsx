/** NumericSlider.tsx
 * @file Wraps MUI Slider and just makes use less bulky
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {ChangeEvent, ReactElement} from "react";
import {Grid, Slider, Typography} from "@material-ui/core";
import {THEME} from "../../constants";


interface NumericSliderStyleProps {

}

const NumericSliderRoot = styled.div<NumericSliderStyleProps>`
  .MuiSlider-mark {
    height: 8px;
    padding: 0;
    margin-top: -3px;
    width: 1px;
    background: ${THEME.primary.main};
    //background: purple;
  }

  .Mui-disabled {
    .MuiSlider-rail {
      color: hsl(0, 0%, 52%);
    }

    .MuiSlider-track {
      color: hsl(0, 0%, 52%);
    }

    .MuiSlider-thumb {
      color: hsl(0, 0%, 52%);
    }

    color: hsl(0, 0%, 52%);
  }
`

export interface SliderMark {
    value: number;
    label?: string;
}


interface NumericSliderProps {
    value: number;
    onChange: (val: number) => void;
    Icon?: () => ReactElement;
    label?: string;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    marks?: SliderMark[];
    snapThresh?: number;
}

/**
 * Wraps MUI Slider and makes its use in this app less bulky
 * @param {number} value - value that this slider controls
 * @param {(val: number) => void} onChange - function to call on change
 * @param {() => ReactElement} [Icon] - Icon component to show to the left of the slider
 * @param {string} [label] - the name of the control
 * @param {boolean} [disabled=false] - whether or not the input is disabled
 * @param {number} [min=0] - minimum possible value
 * @param {number} [max=1] - maximum possible value
 * @param {number} [step=0.02] - smallest increments the slider can move in
 * @param {number} [snapThresh=0] - if value is within 'snapThresh' distance to any mark in
 *      'marks', value will snap to the value at that mark
 * @param {SliderMark[]} [marks] - any marks that should be rendered on the slider
 * @return {JSX.Element} - div containing MUI slider and its label
 */
const NumericSlider: React.FC<NumericSliderProps> = (
    {
        value,
        onChange,
        label,
        Icon,
        disabled = false,
        min = 0,
        max = 1,
        step = 0.02,
        snapThresh = 0,
        marks,
    }
) => {

    const onChangeWrapper = (e: ChangeEvent<{}>, val: number | number[]) => {
        val = Array.isArray(val) ? val[0] : val;
        if (marks) {
            for (const mark of marks) {
                if (Math.abs(mark.value - val) <= snapThresh) {
                    val = mark.value;
                    break;
                }
            }
        }
        onChange(val);
    }

    return (
        <NumericSliderRoot>
            <Typography id={"opacitySlider"} gutterBottom>{label}</Typography>
            <Grid container spacing={Icon ? 1 : 0} alignItems="center">
                {Icon && (
                    <Grid item>
                        <Icon/>
                    </Grid>
                )}
                <Grid item xs>
                    <Slider
                        className={"slider"}
                        value={value}
                        onChange={onChangeWrapper}
                        aria-labelledby={"opacitySlider"}
                        min={min}
                        max={max}
                        step={step}
                        disabled={disabled}
                        marks={marks}
                    />
                </Grid>

            </Grid>

        </NumericSliderRoot>
    )
}


export default NumericSlider;