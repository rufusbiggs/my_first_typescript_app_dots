'use client';
import React, { useState, type MouseEvent} from 'react'

interface Dots {
    x: number,
    y: number
}

const App = () => {

    const [dots, setDots] = useState<Dots[]>([]);
    const [cache, setCache] = useState<Dots[]>([]);

    const addDot = (e : MouseEvent) => {
        const { clientX, clientY } = e;
        setDots([...dots, {
            x: clientX,
            y: clientY
        }]);
    }

    const undo = () => {
        if (dots.length > 0){
            const undoDots = [...dots];
            const lastDot = undoDots.pop()!;
            setDots(undoDots);
            setCache([...cache, lastDot]);
        }
    }

    const redo = () => {
        if (cache.length > 0){
            const redoDots = [...cache];
            const lastCache = redoDots.pop()!;
            setCache(redoDots);
            setDots([...dots, lastCache]);
        }
    }

  return (
    <div className="app-container">
        <div className="buttons">
            <button className="undo" onClick={undo} >Undo</button>
            <button className="redo" onClick={redo} >Redo</button>
        </div>
        <div className="click-container" onClick={addDot} >
            {dots.map(({ x, y } : Dots, i : number) => (
                <div key={`dot-id-${i}`} className="click-spots" style={{left: x, top: y}} />
            ))}

        </div>
    </div>
  )
}

export default App