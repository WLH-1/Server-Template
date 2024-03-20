import React,{ useEffect,  useState } from "react";
export const windowSizeRange=()=>{
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth);
        };
        updateWindowWidth()
        window.addEventListener('resize', updateWindowWidth);
        
        return () => window.removeEventListener('resize', updateWindowWidth);
      }, []);
      return windowWidth
}


