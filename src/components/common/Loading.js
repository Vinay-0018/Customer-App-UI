import React from 'react';
import { LoadingSvgPath } from './StylingConstants'

const Loading= () => {
  return (
    <div className="transition ease-in-out fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 backdrop-blur-lg z-50">
        <div className="absolute w-full h-full bg-gray-300 opacity-75"></div>
        <div className="z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin" width="50" height="50" viewBox="0 0 50 50"><path d={LoadingSvgPath}></path></svg>
            <p className="text-center">Loading</p>
        </div>
    </div>
    )
};

export default Loading;
