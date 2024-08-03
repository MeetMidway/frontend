import React from "react"
import AuthView from "./Screen/AuthView"
import HomeView from "./Screen/HomeView";




function RenderScreen()  {
    const auth = true;
    return (auth ? <AuthView /> : <HomeView />)
}

export default RenderScreen