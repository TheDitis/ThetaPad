/** Navbar.tsx
 * @file Navbar component of the app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import {NAVBAR_HEIGHT} from "../../constants";


const NavbarRoot = styled.div`
  position: relative;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: ${NAVBAR_HEIGHT}px;
  margin: 0;
  box-sizing: border-box;
  background: #212328;
  box-shadow: 0 0 20px black;

  h1 {
    margin: 0 20px;
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
            <h1>ThetaPad</h1>
        </NavbarRoot>
    )
}


export default Navbar;