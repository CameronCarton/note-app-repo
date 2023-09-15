import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

interface NavBarProps {
    themeColors: string[];
    updateThemeColors: (newColors: string[]) => void;
}

const NavBar: React.FC<NavBarProps> = ({ themeColors, updateThemeColors }) => {

    const [themeMode, setThemeMode] = useState(0);

    const darkTheme = ["#13223F", "#000000", "#FFFFFF", "#0C75FF"];
    const lightTheme = ["#FFFFFF", "#DDDCE5", "#313451", "#0C75FF"];

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
        localStorage.setItem("theme",JSON.stringify(themeSwitch));
    }

    useEffect(() => {

        //load local storage data (theme)
        let themeModeData = localStorage.getItem("theme");
        if(themeModeData!=null){
            if(JSON.parse(themeModeData) != themeMode)
            changeTheme();
        }

    }, []);

    return (
        <>
            <div className="navbar" style={{backgroundColor:themeColors[0]}}>
                <div className="title" style={{color:themeColors[2], justifyContent:"center",fontWeight: "bold"}}>eZnote</div>
                <div className="title" style={{color:themeColors[2]}}>

                    
                    
                    <div style={{display:"flex",paddingTop:"5px"}}>
                        <div className="options" style={{color:themeColors[2]}} onClick={changeTheme}>Developer</div>
                        {themeMode==1 ?(
                            <div className="options" style={{color:themeColors[2]}} onClick={changeTheme}>
                            <FontAwesomeIcon icon={faCircleHalfStroke} /></div>
                        ):(
                            <div className="options" style={{color:themeColors[2]}} onClick={changeTheme}>
                            <FontAwesomeIcon icon={faCircle} /></div>
                        )}
                    </div>
                </div>
                
            </div>
        </>
    )
  }
  
  export default NavBar
  