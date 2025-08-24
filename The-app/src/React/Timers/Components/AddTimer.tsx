import React,{useState} from "react";

const AddTimer=()=>{
    
    return(
        <>
        <div className="flex z-50 w-[100vw] h-[100vh] bg-opacity-50 justify-center items-center bg-black">
            <div className="flex flex-col bg-gray-200 w-72  h-24 gap-5 p-3 justify-center items-center">
                <h3 className="font-semibold text-black"> Title </h3>
                <div className="bg-white mx-4 my-2">
                    00:00:00
                </div>
            </div>
        </div>
        </>
    )

}

export default AddTimer;