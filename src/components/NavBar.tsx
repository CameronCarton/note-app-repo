import { useEffect, useState } from 'react'

interface NavBarProps {
    themeColors: string[];
    updateThemeColors: (newColors: string[]) => void;
}

const NavBar: React.FC<NavBarProps> = ({ themeColors, updateThemeColors }) => {

    const [themeMode, setThemeMode] = useState(0);

    const darkTheme = ["#13223F", "#000000", "#FFFFFF", "#0C75FF"];
    const lightTheme = ["#FFFFFF", "#DDDCE5", "#535789", "#0C75FF"];

    const changeTheme = () => {
        let themeSwitch = themeMode;
        themeSwitch+=1;
        if(themeSwitch>1)themeSwitch=0;

        //check if theme mode is light or dark
        if(themeSwitch==0){ //dark
            updateThemeColors(darkTheme);
            console.log("Theme changed to Dark mode");
        }else 
        if(themeSwitch==1){ //light
            updateThemeColors(lightTheme);
            console.log("Theme changed to Light mode");
        }
        setThemeMode(themeSwitch);
    }

    return (
        <>
            <div className="navbar" style={{backgroundColor:themeColors[0]}}>
                <div className="title" style={{color:themeColors[2]}}>eZnote</div>
                <div className="options" style={{color:themeColors[2]}} onClick={changeTheme}>●●●</div>
            </div>
        </>
    )
  }
  
  export default NavBar
  