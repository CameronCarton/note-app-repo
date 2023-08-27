

interface NavBarProps {
    themeColors: string[];
}

function NavBar({themeColors}: NavBarProps) {

    return (
        <>
            <div className="navbar" style={{backgroundColor:themeColors[0]}}>
                <div className="title" style={{color:themeColors[2]}}>eZnote</div>
                <div className="options" style={{color:themeColors[2]}}>●●●</div>
            </div>
        </>
    )
  }
  
  export default NavBar
  