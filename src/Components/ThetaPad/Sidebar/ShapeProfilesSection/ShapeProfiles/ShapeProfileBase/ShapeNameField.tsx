/** ShapeNameField.tsx
 * @file DIsplays the name of a given shape in its profile and allows users to edit it
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import {Shape} from "../../../../../../types/shapes";
import {useAppDispatch} from "../../../../../../redux/hooks";
import {updateShape} from "../../../../../../redux/slices/shapesSlice";


interface ShapeNameFieldStyleProps {
    disabled: boolean;
    isFocused: boolean;
}

const ShapeNameFieldRoot = styled.input<ShapeNameFieldStyleProps>`
  padding-left: 5px;
  width: 80px;
  height: 90%;
  outline: none;
  border: none;
  font-size: 13pt;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;;
  overflow-x: visible;
  background: transparent;
  opacity: ${({disabled}) => disabled ? 0.6 : 1};
  
  &:hover {
    transform: ${({isFocused, disabled}) => (
        isFocused || disabled ? "none" : "scale(1.01)"
    )};
  }
`

interface ShapeNameFieldProps {
    shape: Shape;
    index: number;
    disabled?: boolean;
}


const ShapeNameField: React.FC<ShapeNameFieldProps> = (
    {shape, index, disabled = false}
) => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [name, setName] = useState<string>(
        shape.name || `${shape.kind} ${index}`
    );


    useEffect(() => {
        if (shape.name === null) {
            setName(`${shape.kind} ${index}`)
        }
    }, [shape.name, index, shape.kind])

    const onChange = (e) => {
        setName(e.target.value)
    }

    const onBlur = () => {
        setIsFocused(false);
        if (!name || name.match(/(?:^|\W)(Circle|Line|Poly|Shape) [0-9]+(?:$|\W)/)) {
            dispatch(updateShape({
                target: shape.id,
                newValues: {name: null}
            }))
            setName(`${shape.kind} ${index}`)
        }
        else {
            dispatch(updateShape({
                target: shape.id,
                newValues: {name}
            }))
        }
    }

    return (
        <ShapeNameFieldRoot
            isFocused={isFocused}
            disabled={disabled}
            ref={inputRef}
            type={"text"}
            onChange={onChange}
            onKeyDown={(e) => {
                if (inputRef.current !== null && e.key === "Enter") {
                    inputRef.current.blur();
                }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={onBlur}
            value={name}
            spellCheck={false}
            aria-multiline
        />
    )
}


export default ShapeNameField;