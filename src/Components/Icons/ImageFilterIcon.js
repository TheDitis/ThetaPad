import React from 'react';


const ImageFilterIcon = ({
     width = 55,
     height = 55,
     color = "black",
     strokeWidth = 20,
}) => {

    // const width = 458 / 8;
    // const height = 358 / 8;

    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={width} height={height} viewBox="0 0 500 500" enableBackground="new 0 0 500 500" style={{margin: 0}}>
            <path fill="none" stroke={color} strokeWidth={strokeWidth * 1.4} strokeLinecap="round" strokeMiterlimit="10" d="M308,381.5H55.5c-7.732,0-14-6.268-14-14v-263c0-7.732,6.268-14,14-14h386c7.732,0,14,6.268,14,14v263c0,7.732-6.268,14-14,14h-47"/>
            <line fill="none" stroke={color} strokeWidth={strokeWidth * 1.2} strokeLinecap="round" strokeMiterlimit="10" x1="250" y1="229.5" x2="394.5" y2="445.5"/>
            <line fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeMiterlimit="10" x1="292.384" y1="240.31" x2="342.229" y2="253.47"/>
            <line fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeMiterlimit="10" x1="288.731" y1="210.823" x2="335.323" y2="188.978"/>
            <line fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeMiterlimit="10" x1="267.035" y1="190.528" x2="288.693" y2="143.893"/>
            <line fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeMiterlimit="10" x1="237.371" y1="188.853" x2="224.006" y2="139.159"/>
            <line fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeMiterlimit="10" x1="213.523" y1="206.572" x2="171.311" y2="176.976"/>
            <line fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeMiterlimit="10" x1="206.57" y1="235.457" x2="155.088" y2="239.775"/>
            <line fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeMiterlimit="10" x1="219.741" y1="262.088" x2="182.875" y2="298.381"/>
            <line fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeMiterlimit="10" x1="246.918" y1="274.094" x2="241.761" y2="325.57"/>
        </svg>

    )
};

export default ImageFilterIcon;