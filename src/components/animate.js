import React, {useRef, useEffect, useState} from 'react'
import useWindowSize from '../hooks/useWindowSize'
import {Player, FFT} from 'tone'
import Button from './Button'

const Animate = () => {
    const [count,setCount] = useState([])
    const [playing, setPlaying] = useState(false)
    const cnvRef = useRef()
 const fft = useRef(
     new FFT(32)
 )
const [width, height] = useWindowSize()  
const track = useRef('https://res.cloudinary.com/makingthings/video/upload/v1568881368/mp3/go_for_landing.mp3')  
const player = useRef(
    new Player(track.current,()=>{ setPlaying(true) }).connect(fft.current).toMaster()
)
// useEffect(()=>{
//     const context = cnvRef.current.getContext('2d')
        
//         context.clearRect(0,0, width, height )
//         if(count.length){
//             for(let i = 0; i <= count.length ; i++){
//                 context.fillRect(0,0,count[i],[0],100)        
//             }
//         }
        
//         context.beginPath();
//         context.moveTo(100, 100);
//         context.lineTo(200, 200);

//     })

const rAF = useRef()
useEffect(()=>{
    const context = cnvRef.current.getContext('2d')
    const loop = (time) => {    
        rAF.current = requestAnimationFrame(loop)
        const value = fft.current.getValue()
        
        if(player.current.state === 'started'){   
                        
            context.clearRect(0, 0, width, height)
            // const lineWidth = 4
            // context.fillStyle = 'white'
		    value.forEach((v, i) => {
            
                const scale = (inputY, yRange, xRange) => {
                    const [xMin, xMax] = xRange;
                    const [yMin, yMax] = yRange;
                  
                    const percent = (inputY - yMin) / (yMax - yMin);
                    const outputX = percent * (xMax - xMin) + xMin;
                  
                    return outputX;
                  };
                
            const x = scale(i, [0, value.length],[0,width])
			// const x = Math.scale(i, 0, value.length, 0, width)
            const barHeight = scale(v, [-100, 0],[ 0, height])            
			context.fillRect(x, height/2 - barHeight/2, 2, barHeight)			
			context.fill()
		})
        }else{
            return console.log('wtf')
        }
    }
console.log(player.current.state)    
    loop()
return()=> cancelAnimationFrame(rAF.current)    
})    

    const clickHandler = () => {
        player.current.start()
        if(fft.current.getValue().length){
            setCount(fft.current.getValue())
        }
    }

    const stopClickHandler = () => {
        player.current.stop()
    }

    return(
        <>
        
        {playing ? <Button clickHandler={clickHandler} playing={!playing}>Play</Button> :<p>Loading</p>}
        <canvas ref={cnvRef} width={width} height={height} />
        </>
    )
}

export default Animate

