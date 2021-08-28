/** NumericInput.tsx
 * @file Styled Material-UI input wrapper input for numerical values
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import {TextField} from "@material-ui/core";
import _ from "lodash";
import {limitValue} from "../../utils/utils";


interface NumericInputStyleProps {
}

const NumericInputRoot = styled(TextField)<NumericInputStyleProps>``

interface NumericInputProps {
    label: string;
    onChange: (v: number) => void;
    value?: number;
    defaultValue?: number;
    disabled?: boolean;
    integer?: boolean;
    min?: number;
    max?: number;
}


/**
 * A wrapper for MUI TextField that only accepts numeric values
 * @param {string} label - label for this control
 * @param {(v: number) => void} onChange - function to handle new value change
 * @param {number} [value] - current value of this control
 * @param {number} [defaultValue] - default value of this control
 * @param {boolean} [disabled=false] - if true, the input will be disabled
 * @param {boolean} [integer=false] - if true, decimal places will be disallowed
 * @param {number} [min=-Infinity] - minimum value allowed
 * @param {number} [max=Infinity] - maximum value allowed
 * @return {JSX.Element} - wrapped and stylized NumericInputRoot
 */
const NumericInput: React.FC<NumericInputProps> = (
    {
        label,
        onChange,
        value,
        defaultValue,
        disabled = false,
        integer = false,
        min = -Infinity,
        max = Infinity
    }
) => {

    const onChangeWrapper = (e) => {
        let val = e.target.value;

        if (integer) {
            val = parseInt(
                _.takeWhile(val.toString().split(''), (char: string) => (
                    char >= '0' && char <= '9'
                )).join('')
            )
        }

        onChange(limitValue(val, min, max));
    }

    return (
        <NumericInputRoot
            type={"number"}
            key={label + "NumberInput"}
            label={label}
            onChange={onChangeWrapper}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
        />

    )
}


export default React.memo(NumericInput);