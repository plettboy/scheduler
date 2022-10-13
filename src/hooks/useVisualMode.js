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
      console.log("TESTING1", newMode, "replace", replace)
      console.log("history", history)
    } else {
      console.log("TESTING2", newMode, "replace", replace)
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
      console.log("history", historyUpdate)
      setMode(historyUpdate[historyUpdate.length - 1]);
    }
  }

  return { mode, transition, back };
}