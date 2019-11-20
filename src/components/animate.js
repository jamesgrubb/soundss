import React, {useRef, useEffect, useState} from 'react'
import useWindowSize from '../hooks/useWindowSize'
import {Player, FFT, Time} from 'tone'
import Button from './Button'

const Animate = () => {
    const [count,setCount] = useState([])
    const [loaded, setLoaded] = useState(false)
    const cnvRef = useRef()
    const time = useRef(
        new Time()
    )
 const fft = useRef(
     new FFT(32)
 )
const [width, height] = useWindowSize()  
const track = useRef('https://res.cloudinary.com/makingthings/video/upload/v1568881368/mp3/go_for_landing.mp3')  
const player = useRef(
    new Player(track.current,()=>{ setLoaded(true) }).fan(fft.current,time.current).toMaster()
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
    const loop = () => {    
        rAF.current = requestAnimationFrame(loop)
        const value = fft.current.getValue()
        
        if(player.current.state === 'started'){   
            console.log(time.current.valueOf())           
         
            context.clearRect(0, 0, width, height)
            // const lineWidth = 4
            // context.fillStyle = 'white'
            context.font='48px sans-serif';
            context.fillText(Math.floor(time.current.valueOf()), 10, height / 2)
            
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

    const playkHandler = () => {
        player.current.start()

        if(fft.current.getValue().length){
            setCount(fft.current.getValue())
            console.log(time.current.valueOf())
        }
    }

    const stopHandler = () => {
        player.current.stop()
    }

    return(
        <>
        
        <Button clickHandler={playkHandler} disabled={!loaded}>Play</Button>
        <Button clickHandler={stopHandler} disabled={!loaded}>Stop</Button>
        <canvas ref={cnvRef} width={width} height={height} />
        </>
    )
}

export default Animate

