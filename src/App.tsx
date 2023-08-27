import NavBar from "./components/NavBar";
import Section from "./components/Section";
import '../src/App.css'

function App() {

  const themeColors = ["#13223F", "#000000", "#FFFFFF", "#0C75FF"];
  //const themeColors = ["#FFFFFF", "#DDDCE5", "#535789", "#0C75FF"];

  return (
    <>
      <NavBar themeColors={themeColors}/>
      <Section themeColors={themeColors}/>
    </>
  )
}

export default App
