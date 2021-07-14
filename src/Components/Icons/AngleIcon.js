import React from 'react';


const AngleIcon = (props) => {

    const width = 458 / (1 / props.size) / 4;
    const height = 358 / (1 / props.size) / 4;

    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={width} height={height} viewBox="0 0 458 358" enableBackground="new 0 0 458 358" style={{marginTop: 8}}>

            <g id="Angle">
                <g>
                    <path fill="none" stroke={props.color} strokeWidth="26" strokeLinecap="round" strokeMiterlimit="10" d="M438.667,312.417H49.333c-13.2,0-15.667-6.869-5.48-15.266L359.177,37.23"/>
                </g>
                <path fill="none" stroke={props.color} strokeWidth="17" strokeMiterlimit="10" d="M177.26,182.994c29.865,30.936,48.237,73.041,48.237,119.436c0,4.364-0.163,8.691-0.482,12.974"/>

                {/*<text transform="matrix(0.9802 0 0 1 77.4004 128.1538)" stroke={props.color} fill={props.color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fontFamily="'MyriadPro-Regular'" fontSize="103.0353" letterSpacing="7.141">X°</text>*/}

                <line fill="none" stroke={props.color} strokeWidth="9" strokeLinecap="round" strokeMiterlimit="10" x1="228.472" y1="290.981" x2="254.441" y2="289.611"/>

                <line fill="none" stroke={props.color} strokeWidth="9" strokeLinecap="round" strokeMiterlimit="10" x1="229.324" y1="274.234" x2="252.562" y2="270.807"/>

                <line fill="none" stroke={props.color} strokeWidth="9" strokeLinecap="round" strokeMiterlimit="10" x1="223.37" y1="258.519" x2="248.935" y2="252.262"/>

                <line fill="none" stroke={props.color} strokeWidth="9" strokeLinecap="round" strokeMiterlimit="10" x1="219.283" y1="242.564" x2="243.592" y2="234.139"/>

                <line fill="none" stroke={props.color} strokeWidth="9" strokeLinecap="round" strokeMiterlimit="10" x1="212.323" y1="227.635" x2="236.575" y2="216.593"/>

                <line fill="none" stroke={props.color} strokeWidth="9" strokeLinecap="round" strokeMiterlimit="10" x1="204.708" y1="213.115" x2="227.951" y2="199.781"/>

                <line fill="none" stroke={props.color} strokeWidth="9" strokeLinecap="round" strokeMiterlimit="10" x1="195.633" y1="199.482" x2="217.793" y2="183.849"/>
            </g>
        </svg>

    )
};

export default AngleIcon;
