/** UndoOrRedoButton.tsx
 * @file button generalized by both undo and redo, with type set by props
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {IconButton, makeStyles} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/reduxHooks";
import React from "react";
import {Redo, Undo} from "@material-ui/icons";
import {redo, undo} from "../../../../../redux/slices/undoRedoSlice";
import {hasFutureActionsSelector, hasPastActionsSelector} from "../../../../../redux/selectors";

const useStyles = makeStyles({
    UndoOrRedoButton: {
        background: "hsl(0,0%,90%)",
        height: 26,
        width: 50,
        fontSize: "18pt",
        borderRadius: 5,
        marginTop: 8,

        "&.Mui-disabled": {
            background: "hsl(0, 0%, 90%)"
        },

        "&:hover": {
            background: "hsl(0,0%,100%)",
        }
    }
})

export interface UndoOrRedoButtonProps {
    variant: "undo" | "redo";
}

/**
 * Button used for undo and redo in the ControlsSection of the Sidebar
 * @param {"undo" | "redo"} variant - whether clicking will undo or redo actions
 * @return {JSX.Element} - MUI IconButton with appropriate icon and click handler
 */
const UndoOrRedoButton: React.FC<UndoOrRedoButtonProps> = ({variant}) => {
    const dispatch = useAppDispatch();
    const hasActions = useAppSelector(variant === "undo"
        ? hasPastActionsSelector
        : hasFutureActionsSelector
    )
    const classes = useStyles();

    return (
        <IconButton
            className={classes.UndoOrRedoButton}
            disabled={!hasActions}
            onClick={() => {
                dispatch(variant === "undo" ? undo() : redo())}
            }
            color={"primary"}
        >
            {variant === "undo"
                ? <Undo fontSize={"inherit"}/>
                : <Redo fontSize={"inherit"}/>
            }
        </IconButton>
    )
}


export default UndoOrRedoButton;