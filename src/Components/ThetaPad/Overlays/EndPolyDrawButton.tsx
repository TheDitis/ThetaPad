/** EndPolyDrawButton.tsx
 * @file Button that pops up in the corner to end a poly-draw if one is in progress
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {tempShapeSelector} from "../../../redux/selectors";
import {ShapeKind} from "../../../types/shapes";
import {AnimatePresence, motion} from "framer-motion";
import {Button, makeStyles} from "@material-ui/core";
import {useAppSelector} from "../../../redux/hooks";

const useStyles = makeStyles({
    EndPolyDrawButton: {
        position: "absolute",
        right: 20,
        bottom: 20,
    },
    button: {
        backgroundColor: "hsl(219, 30%, 18%)",
        color: "white",
        borderRadius: 15,
        padding: 20,
        "&:hover": {
            background: "hsl(219, 30%, 30%)",
        }
    }
})


const variants = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,
    }
}


const EndPolyDrawButton: React.FC = () => {
    const tempShape = useAppSelector(tempShapeSelector);
    const classes = useStyles();

    const dispatchEscapeEvent = () => {
        const e = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key: "escape", shiftKey : false});
        document.dispatchEvent(e);
    }

    return (
        <AnimatePresence>
            {tempShape !== null && tempShape.kind === ShapeKind.Poly && (
                <motion.div
                    className={classes.EndPolyDrawButton}
                    variants={variants}
                    initial={"hidden"}
                    animate={"visible"}
                    exit={"hidden"}
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                >
                    <Button
                        className={classes.button}
                        onClick={dispatchEscapeEvent}
                    >
                        End (esc)
                    </Button>

                </motion.div>
            )}
        </AnimatePresence>
    )

}


export default EndPolyDrawButton;