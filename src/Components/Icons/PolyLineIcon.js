import React from 'react';


const PolyLineIcon = () => {

    const width = 458 / 12;
    const height = 358 / 12;

    return (
        <svg width={width} height={height} viewBox="0 0 458 358">
            <polyline
                fill="none"
                stroke="black"
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                points="71.333,319.333 145.333,121.334 305.333,252 380.333,24.667 "
            />
        </svg>
    )

};


export default PolyLineIcon;