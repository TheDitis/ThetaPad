/** UserNavMenu.tsx
 * @file User Icon with access to options
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {useRef, useState} from "react";
import {logOut, UserType} from "../../../redux/slices/userSlice";
import defaultImage from "../../../assets/images/default_profile.png";
import {NAVBAR_HEIGHT} from "../../../constants";
import {teal} from "@material-ui/core/colors";
import {AnimatePresence, motion} from "framer-motion";
// import {MenuItem} from "@material-ui/core";
import {Button, styled as MuiStyled} from "@material-ui/core"
import {useAppDispatch} from "../../../hooks/reduxHooks";


interface UserNavMenuStyleProps {
}

const UserNavMenuRoot = styled(motion.div)<UserNavMenuStyleProps>`

  .profileImage {
    border-radius: 50%;
    border: 2px solid ${teal[500]};
    margin-top: 3px;
    -webkit-user-drag: none;
  }

  .menu {
    position: absolute;
    top: ${NAVBAR_HEIGHT + 5}px;
    right: 5px;
    background: white;
    border-radius: 5px;
    padding: 5px 0;
    
    .triangle {
      position: absolute;
      top: -80px;
      right: -25%;
      fill: white;
      stroke: none;
    }
  }
`

const variants = {
    menu: {
        open: {
            y: 0,
            scaleY: 1,
            opacity: 1
        },
        closed: {
            y: "-50%",
            scaleY: 0,
            opacity: 0
        }
    }
}

interface UserNavMenuProps {
    user: UserType
}

const UserNavMenu: React.FC<UserNavMenuProps> = ({user}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOutsideClick = (e) => {
        if (menuRef.current !== null && !menuRef.current.contains(e.target)) {
            handleClick();

        }
    }

    const handleClick = () => {
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick, false);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick, false);
        }
        setIsOpen(!isOpen);
    }

    return (
        <UserNavMenuRoot ref={menuRef}>
            <img
                className={"profileImage"}
                src={user?.photoURL ?? defaultImage}
                alt={"User Menu"}
                height={NAVBAR_HEIGHT * 0.85}
                width={NAVBAR_HEIGHT * 0.85}
                onClick={handleClick}
            />
            {/*<Menu open={isOpen} anchorEl={menuRef.current}>*/}
            {/*    <MenuItem onClick={() => dispatch(logOut())}>Logout</MenuItem>*/}
            {/*</Menu>*/}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={"menu"}
                        variants={variants.menu}
                        animate={"open"}
                        initial={"closed"}
                        exit={"closed"}
                    >
                        {/*<svg className={"triangle"} height="100" width="100">*/}
                        {/*    <polygon points="50,65 30,80 70,80" className="triangle"/>*/}
                        {/*    Sorry, your browser does not support inline SVG.*/}
                        {/*</svg>*/}
                        <MenuItem onClick={() => dispatch(logOut())}>
                            Log Out
                        </MenuItem>
                    </motion.div>
                )}

            </AnimatePresence>
        </UserNavMenuRoot>
    );
}


const MenuItem = MuiStyled(Button)({
    height: 35,
    width: 120,
    color: "hsl(0, 0%, 30%)",
    // paddingLeft: 20,
    // justifyContent: "flex-start"
})


export default UserNavMenu;