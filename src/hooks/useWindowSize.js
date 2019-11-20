import {useEffect, useState} from "react"

export default function useWindowSize() {
    
    const [[width, height], setWindowSize] = useState([window.innerWidth,window.innerHeight])

    useEffect(()=>{
        const handleResize = (cb) => {
            if(cb && cb.type === 'function'){
cb()
setWindowSize([window.innerWidth,window.innerHeight])
            }else{
                setWindowSize([window.innerWidth,window.innerHeight])
            }
            
        }
        window.addEventListener('rezise', handleResize)
        return()=> window.removeEventListener('rezie', handleResize)
    },[])

    
    return [width, height]
}

