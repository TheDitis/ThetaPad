/** ShowMoreButton.tsx
 * @file Button to toggle dropdown menus
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {motion} from "framer-motion";


const variants = {
    closed: {
        rotate: -90
    },
    open: {
        rotate: -180
    }
}

interface ShowMoreButtonProps {
    onClick: (e) => void;
    isOpen: boolean;
}

/**
 * Arrow button to open a dropdown and rotate accordingly
 * @param {(e) => void} onClick - function to handle the click
 * @param {boolean} isOpen - arrow points left when false and down when true
 * @return {JSX.Element} - motion.p element with an arrow character
 */
const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({onClick, isOpen}) => {
    return (
        <motion.p
            variants={variants}
            initial={"closed"}
            animate={isOpen ? "open" : "closed"}
            transition={{ease: "easeInOut"}}
            onClick={onClick}
        >
            ▲
        </motion.p>
    )
}


export default ShowMoreButton;