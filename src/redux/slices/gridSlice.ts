import {createSlice} from "@reduxjs/toolkit";
import {SIDEBAR_WIDTH} from "../../Components/constants";

interface GridStateType {
    color: string;
    nColumns: number;
    nRows: number;
    width: number;
    height: number;
    strokeWidth: number;
    opacity: number;
}

const initialState: GridStateType = {
    color: 'black',
    nColumns: 8,
    nRows: 12,
    width: window.innerWidth - SIDEBAR_WIDTH,
    height: window.innerHeight,
    strokeWidth: 1,
    opacity: 0.8
}



// const gridSlice = createSlice({
//     name: "grid",
//
// })