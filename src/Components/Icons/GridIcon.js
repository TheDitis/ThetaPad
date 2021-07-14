import React from 'react';


const GridIcon = (props) => {

    const width = 458 / 8;
    const height = 358 / 8;

    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={width} height={height} viewBox="0 0 500 500" enableBackground="new 0 0 500 500" style={{margin: 0}}>
            <line fill="none" stroke={props.color} strokeWidth="18" strokeLinecap="round" strokeMiterlimit="10" x1="56.623" y1="58.543" x2="56.623" y2="436.555"/>
            <line fill="none" stroke={props.color} strokeWidth="18" strokeLinecap="round" strokeMiterlimit="10" x1="247.418" y1="56.345" x2="247.418" y2="436.123"/>
            <line fill="none" stroke={props.color} strokeWidth="18" strokeLinecap="round" strokeMiterlimit="10" x1="438.212" y1="56.345" x2="438.212" y2="436.123"/>
            <line fill="none" stroke={props.color} strokeWidth="18" strokeLinecap="round" strokeMiterlimit="10" x1="431.791" y1="55.046" x2="59.811" y2="55.046"/>
            <line fill="none" stroke={props.color} strokeWidth="18" strokeLinecap="round" strokeMiterlimit="10" x1="431.791" y1="245.84" x2="59.811" y2="245.84"/>
            <line fill="none" stroke={props.color} strokeWidth="18" strokeLinecap="round" strokeMiterlimit="10" x1="431.791" y1="436.635" x2="59.811" y2="436.635"/>
            <line fill="none" stroke={props.color} strokeWidth="18" strokeLinecap="round" strokeMiterlimit="10" x1="59.81" y1="433.448" x2="435.025" y2="58.232"/>
            <line fill="none" stroke={props.color} strokeWidth="18" strokeLinecap="round" strokeMiterlimit="10" x1="61.862" y1="240.601" x2="242.179" y2="60.285"/>
            <line fill="none" stroke={props.color} strokeWidth="18" strokeLinecap="round" strokeMiterlimit="10" x1="252.656" y1="431.396" x2="432.973" y2="251.079"/>
            <line fill="none" stroke={props.color} strokeWidth="18" strokeLinecap="round" strokeMiterlimit="10" x1="63.479" y1="59.312" x2="436.188" y2="432.021"/>
            <line fill="none" stroke={props.color} strokeWidth="18" strokeLinecap="round" strokeMiterlimit="10" x1="60.727" y1="247.821" x2="246.681" y2="433.775"/>
            <line fill="none" stroke={props.color} strokeWidth="18" strokeLinecap="round" strokeMiterlimit="10" x1="253.303" y1="57.03" x2="436.12" y2="239.848"/>
        </svg>

    )
};

export default GridIcon;