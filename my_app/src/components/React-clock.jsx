import { useState, useEffect } from 'react';

function React_Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <h2> Поточний час: {time.toLocaleTimeString()}</h2>;
}

export default React_Clock;