/** NumericInput.tsx
 * @file Styled Material-UI input wrapper input for numerical values
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import {TextField} from "@material-ui/core";
import _ from "lodash";


interface NumericInputStyleProps {
}

const NumericInputRoot = styled(TextField)<NumericInputStyleProps>``

interface NumericInputProps {
    label: string;
    onChange: (v: number) => void;
    value?: number;
    defaultValue?: number;
}

const NumericInput: React.FC<NumericInputProps> = ({label, onChange, value, defaultValue}) => {

    const onChangeWrapper = (e) => {
        const val = e.target.value;
        const filtered = parseInt(
            _.takeWhile(val.toString().split(''), (char: string) => (
                char >= '0' && char <= '9'
            )).join('')
        )

        onChange(Math.max(filtered, 1));
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