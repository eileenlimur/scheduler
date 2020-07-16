import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history] = useState([initial]);

  const transition = function(next, replace = false){
    if (replace === true) {
      history[history.length - 1] = next;
    } else {
      history.push(next);
    }
    setMode(next);
  }
  
  const back = function(){
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1])
    }
  }

  return { mode, transition, back };
}