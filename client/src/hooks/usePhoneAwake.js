import { useRef, useEffect } from "react";

export const usePhoneAwake = (fn = f => f, sleepTime = 3000) => {
  const timer = useRef();
  useEffect(() => {
    let timestamp = new Date();
    timer.current = setInterval(() => {
      let newTimestamp = new Date();
      if (newTimestamp - timestamp > sleepTime + 500) {
        fn();
      }
      timestamp = newTimestamp;
    }, sleepTime);
  }, []);
};
