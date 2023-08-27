import NavBar from "./components/NavBar";
import Section from "./components/Section";
import '../src/App.css'

function App() {

  const themeColors = ["#0A1326", "#000000", "#FFFFFF", "#0C75FF"];
  //const themeColors = ["#FFFFFF", "#DDDCE5", "#0C75FF", "#535789"];

  return (
    <>
      <NavBar themeColors={themeColors}/>
      <Section themeColors={themeColors}/>
    </>
  )
}

export default App
