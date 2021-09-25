/** Navbar.tsx
 * @file Navbar component of the app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import {NAVBAR_HEIGHT} from "../../constants";
import logo from "../../assets/logo.png";
import UserNav from "./UserNav/UserNav";

const NavbarRoot = styled.div`
  position: relative;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: ${NAVBAR_HEIGHT}px;
  margin: 0;
  padding: 0 20px;
  box-sizing: border-box;
  background: #212328;
  box-shadow: 0 0 20px black;
  
  .leftSide {
    display: flex;
    align-items: center;
  }

  .rightSide {
    display: flex;
    align-items: center;
  }

  h1 {
    margin: 0 10px;
    color: white;
    font-size: 20pt;
  }
`

/**
 * Navbar for the app
 * @return {JSX.Element} - flex-row div with app title
 */
const Navbar: React.FC = () => {
    return (
        <NavbarRoot>

            <div className={"leftSide"}>
                <img
                    src={logo}
                    alt={"ThetaPad Logo"}
                    height={NAVBAR_HEIGHT * 0.9}
                    width={NAVBAR_HEIGHT * 0.9}
                />
                <h1>ThetaPad</h1>
            </div>
            <div className={"rightSide"}>
                <UserNav/>
            </div>

        </NavbarRoot>
    )
}


export default Navbar;