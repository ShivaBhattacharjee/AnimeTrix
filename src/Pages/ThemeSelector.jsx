import React from 'react'
import '../css/Themes.css'
const ThemeSelector = () => {
  return (
    <div className='theme-div'>
        <div className="themes">
        <div id="theme-default" className='active'></div>
        <div id="theme-blue"></div>
        <div id="theme-white"></div>
        <div id="theme-green"></div>
        <div id="theme-pink"></div>
        <div id="theme-purple"></div>
        </div>
    </div>
  )
}

export default ThemeSelector