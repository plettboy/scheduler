import { useState } from 'react';

export default function useVisualMode(initial) {

  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setHistory(prev => {
      return replace ? [...prev.slice(0, prev.length - 1), newMode] : [...prev, newMode]
    })
  }

  const back = () => {

    // if (history.length > 1) {
    //   const historyUpdate = [...history];
    //   historyUpdate.pop();
    //   setHistory(historyUpdate);
    //   setMode(history[history.length - 2]);
    //   // setMode(historyUpdate[historyUpdate.length - 1]);
    // }
    setHistory(prev => {
      if (prev.length < 2) {
        return prev
      } else {
        return prev.slice(0, prev.length - 1)
      }
    })
  }

  // return { mode, transition, back };
  return { mode: history[history.length - 1], transition, back };
}