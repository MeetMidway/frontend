import React from "react"
import AuthView from "./Screen/AuthView"
import HomeView from "./Screen/HomeView";




function RenderScreen()  {
    const auth = false;
    return (auth ? <AuthView /> : <HomeView />)
}

export default RenderScreen