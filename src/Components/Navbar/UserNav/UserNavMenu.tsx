/** UserNavMenu.tsx
 * @file User Icon with access to options
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {useRef, useState} from "react";
import {UserType} from "../../../redux/slices/userSlice";
import defaultImage from "../../../assets/images/default_profile.png";
import {NAVBAR_HEIGHT} from "../../../constants";
import {teal} from "@material-ui/core/colors";
import {motion} from "framer-motion";


interface UserNavMenuStyleProps {
}

const UserNavMenuRoot = styled(motion.div)<UserNavMenuStyleProps>`

  .profileImage {
    border-radius: 50%;
    border: 2px solid ${teal[500]};
    margin-top: 3px;
  }

  .menu {
    position: absolute;
    top: ${NAVBAR_HEIGHT}px;
    right: 0;
    background: white;
    width: 100px;
  }

  .menuItem {
    width: 100%;
    height: 50px;
    color: hsl(0, 0%, 30%);
  }
`

interface UserNavMenuProps {
    user: UserType
}

const UserNavMenu: React.FC<UserNavMenuProps> = ({user}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOutsideClick = (e) => {
        console.log(e)
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
            {isOpen && (
                <div className={"menu"}>
                    <MenuItem>Log Out</MenuItem>
                </div>
            )}
        </UserNavMenuRoot>
    );
}


const MenuItem = ({children}) => {
    return (
        <div className={"menuItem"}>
            {children}
        </div>
    )
}


export default UserNavMenu;