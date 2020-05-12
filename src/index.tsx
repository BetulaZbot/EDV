import React from 'react'
import ReactDOM from 'react-dom'
import '@babel/polyfill'
import $UP from './client'
// import getIndexPage from './pages'
import Router from './router'
async function start() {
    // let IndexPage = await getIndexPage();
    ReactDOM.render(
        <Router />,
        document.getElementById('app')
    )
    console.log("Starting")
}


$UP.start({
    start
});







