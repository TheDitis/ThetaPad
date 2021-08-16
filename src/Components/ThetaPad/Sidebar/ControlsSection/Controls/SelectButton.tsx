/** SelectButton.tsx
 * @file A button that indicates whether or not it's selected
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Button, makeStyles} from "@material-ui/core";


interface SelectButtonStyleProps {
    width?: number;
    height?: number;
}

// Get the base style that the button will have in either state
const selectButtonBase = (props: SelectButtonStyleProps) => ({
    width: props.width || "auto",
    height: props.height || "auto",
    color: "black",
    background: "white",
    margin: 10,
    padding: "3px 0px",
    fontSize: "9pt",

    "&:hover": {
        background: "rgba(0, 255, 255, 0.6)",
        color: "white",
    }
})

// create style hook for the Button in SelectButton below
const useStyles = makeStyles({
    // Unselected styles, no different from base
    SelectButton: selectButtonBase,
    // Selected styles, inherits from base and overrides a few properties
    SelectButtonSelected: (props: SelectButtonStyleProps) => ({
        ...selectButtonBase(props),
        color: "white",
        background: "rgb(80, 80, 80)",

        "&:hover": {
            opacity: 0.8,
            background: "rgb(80, 80, 80)",
        }
    }),
})


interface SelectButtonProps {
    onClick: () => void;
    selected: boolean;
    width?: number;
    height?: number;
}


/**
 * Wrapper for Material UI Button with conditional styling based on 'selected'
 * prop. Used in ControlsSection in the Sidebar
 * @param {boolean} selected - whether or not this button is 'selected'
 * @param {() => void} onClick - function to run when the button is clicked
 * @param {number | undefined} [width] - width of the button
 * @param {number | undefined} [height] - height of the button
 * @return {JSX.Element} - Material UI Button styled based on selected prop
 */
const SelectButton: React.FC<SelectButtonProps> = (
    {selected, onClick, width, height, children}
) => {
    const styleProps = {width, height}
    const classes = useStyles(styleProps);

    return (
        <Button
            className={
                selected ? classes.SelectButtonSelected : classes.SelectButton
            }
            onClick={selected ? () => null : onClick}
        >
            {children}
        </Button>
    )
}

export default SelectButton;