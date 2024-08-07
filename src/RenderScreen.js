import React from "react"
import AuthView from "./Screen/AuthView"
import HomeView from "./Screen/HomeView";
import ManageAccount from "./Screen/ManageAccount";




function RenderScreen()  {
    const auth = false;
    return (auth ? <AuthView /> : <ManageAccount />)
}

export default RenderScreen