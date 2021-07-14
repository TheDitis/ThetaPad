/** ShapeProfile.tsx
 * @file The base component for shape profiles in the sidebar
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";

interface ShapeProfileStyleProps {

}

const ShapeProfileRoot = styled.div<ShapeProfileStyleProps>`

`

interface ShapeProfileProps {

}

const ShapeProfile: React.FC<ShapeProfileProps> = (props) => {
    return (
        <ShapeProfileRoot>

        </ShapeProfileRoot>
    )
}

export default ShapeProfile;