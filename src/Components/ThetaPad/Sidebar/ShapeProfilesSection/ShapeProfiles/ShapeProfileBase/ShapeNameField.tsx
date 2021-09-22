/** ShapeNameField.tsx
 * @file DIsplays the name of a given shape in its profile and allows users to edit it
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import {Shape} from "../../../../../../types/shapes";
import {useAppDispatch} from "../../../../../../hooks/reduxHooks";
import {updateShape} from "../../../../../../redux/slices/shapesSlice";

/**
 * @interface ShapeNameFieldStyleProps
 * @property {boolean} disabled - if true, input won't scale on hover and opacity
 *      will be 0.6
 * @property {boolean} isFocused - if true, input won't scale on hover
 * @property {string} color - color of the text
 */
interface ShapeNameFieldStyleProps {
    disabled: boolean;
    isFocused: boolean;
    color: string;
}

const ShapeNameFieldRoot = styled.input<ShapeNameFieldStyleProps>`
  padding-left: 5px;
  width: 160px;
  height: 90%;
  outline: none;
  border: none;
  font-size: 13pt;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;;
  overflow-x: visible;
  background: transparent;
  opacity: ${({disabled}) => disabled ? 0.6 : 1};
  color: ${({color}) => color};
  
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
    color?: string;
}

/**
 * Editable name label for shape profiles, used in ShapeProfileBase
 * @param {Shape} shape - shape to show and allow editing of the name for
 * @param {number} index - index of the shape in the list (used for default name)
 * @param {boolean} [disabled=false] - whether or not the input should be disabled
 * @param {string} color - color of the text
 * @return {JSX.Element} - styled HTML input element with handlers for alteration
 */
const ShapeNameField: React.FC<ShapeNameFieldProps> = (
    {shape, index, disabled = false, color = "black"}
) => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [name, setName] = useState<string>(
        shape.name || `${shape.kind} ${index}`
    );

    /** Make sure names aren't left blank or incorrectly numbered */
    useEffect(() => {
        if (shape.name === null) {
            setName(`${shape.kind} ${index}`)
        }
    }, [shape.name, index, shape.kind])

    /**
     * Update local 'name' state to the current value of the input
     * @param {React.FormEvent<HTMLInputElement>} e - Input change event
     */
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    /**
     * Upon exiting focus, update the name of the shape and check for empty or
     * default formatting patterns
     */
    const onBlur = () => {
        setIsFocused(false);
        // if the input value is blank or it matches default pattern, reset to default
        if (!name || name.match(/(?:^|\W)(Circle|Line|Poly|Shape) [0-9]+(?:$|\W)/)) {
            dispatch(updateShape({
                target: shape.id,
                newValues: {name: null}
            }))
            setName(`${shape.kind} ${index}`)
        }
        // if the name is anything else, update the name of the shape
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
            color={color}
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
        />
    )
}


export default ShapeNameField;