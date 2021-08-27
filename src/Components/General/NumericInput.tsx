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
    integer?: boolean;
    min?: number;
    max?: number;
}

const NumericInput: React.FC<NumericInputProps> = (
    {
        label,
        onChange,
        value,
        defaultValue,
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
        />

    )
}


export default React.memo(NumericInput);