import React from "react";

interface RadiusIconProps {
    size? : number;
    color?: string;
}

const RadiusIcon: React.FC<RadiusIconProps> = ({size = 1, color = "black"}) => {

    const width = 458 / (1 / size) / 4;
    const height = 358 / (1 / size) / 4;

    return (
        <svg width={width} height={height} viewBox="68 18 323 323">
            <path
                d="M229.5,39c37.5,0,72.8,14.6,99.3,41.2c26.5,26.5,41.2,61.8,41.2,99.3s-14.6,72.8-41.2,99.3C302.3,305.4,267,320,229.5,320s-72.8-14.6-99.3-41.2C103.6,252.3,89,217,89,179.5s14.6-72.8,41.2-99.3C156.7,53.6,192,39,229.5,39 M229.5,18C140.3,18,68,90.3,68,179.5S140.3,341,229.5,341S391,268.7,391,179.5S318.7,18,229.5,18L229.5,18z"
                fill={color}
                stroke={color}
                strokeWidth={"1"}
            />
            <line
                className="st0"
                x1="229.5"
                y1="179.5"
                x2="323.1"
                y2="179.2"
                fill={"none"}
                stroke={color}
                strokeWidth={"19"}
                strokeLinecap={"round"}
                strokeMiterlimit={"10"}
            />
            <polygon points="314.9,207.6 364,179 314.7,150.8" stroke={color} fill={color}/>
            {/*<text transform="matrix(1 0 0 1 247.8037 141.7095)" fontFamily={"Gabriola"} fontSize={148}>r</text>*/}
            <text transform="matrix(1 0 0 1 133.1396 230)" fontFamily={"Gabriola"} fill={color} fontSize={300}>r</text>
        </svg>
    )
}

export default RadiusIcon;
