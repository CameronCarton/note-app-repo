import NavBar from "./components/NavBar";
import Section from "./components/Section";
import '../src/App.css'

import { useEffect, useState } from 'react'

function App() {

  const [themeColors,setThemeColors] = useState(["#13223F", "#000000", "#FFFFFF", "#0C75FF"]);

  const updateThemeColors = (newColors:string[]) => {
    setThemeColors(newColors);
  };

  return (
    <>
      <NavBar themeColors={themeColors} updateThemeColors={updateThemeColors}/>
      <Section themeColors={themeColors}/>
    </>
  )
}

export default App
