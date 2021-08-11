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
 * A button that indicates whether or not it's selected
 * @param {React.PropsWithChildren<SelectButtonProps>} props
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