import React from 'react'

export default function Button({clickHandler, playing, children}){
return(
<>
<button onClick={clickHandler} disabled={playing}>{children}</button>
</>
)
}