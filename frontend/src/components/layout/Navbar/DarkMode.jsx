import React , {useState, useEffect} from "react"
//import LightMode from '../../assets/Images/WhiteMode.png';
//import DarkModeImg from '../../assets/Images/DarkMode.png';

export default function DarkMode(){
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        if(theme==="dark"){
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            }else{
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
        
    }, [theme]);

    return(
        <div className="relative">
            <img src={LightMode} alt="LightMode" className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10 
                ${
                    theme=== "dark" ? "opacity-0" : "opacity-100"
                }
                `} 
                onClick={() => setTheme(theme=== "dark" ? "light" : "dark")}
                />
                <img src={DarkModeImg} 
                alt="DarkMode" 
                className="w-12 cursor-pointer drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)] duration-300 "
                onClick={() => setTheme(theme=== "dark" ? "light" : "dark")}
                />
        </div>
    )
}

/* make the dark mode button rounded full*/ 