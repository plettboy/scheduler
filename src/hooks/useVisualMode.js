import { useState } from 'react';

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      const updateHistory = [...history];
      updateHistory.pop();
      updateHistory.push(newMode);
      setHistory(updateHistory);
      setMode(newMode);
    } else {
      setHistory(prev => (
        [...prev, newMode]
      ));
      setMode(newMode);
    }
  }

  const back = () => {
    
    if (history.length > 1) {
      const historyUpdate = [...history];
      historyUpdate.pop();
      setHistory(historyUpdate);
      setMode(historyUpdate[historyUpdate.length - 1]);
    }
  }

  return { mode, transition, back };
}