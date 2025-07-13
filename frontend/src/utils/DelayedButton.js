import React, { useState, useEffect, useRef } from 'react';

function DelayedButton({ onClick }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const intervalRef = useRef(null);

  const startCountdown = () => {
    setCountdown(60);
    setIsDisabled(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick(); // Call the external click function
    }
    startCountdown(); // Start the internal cooldown
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      startCountdown()
    }; // cleanup on unmount
  }, []);

  return (
    <button onClick={handleClick} disabled={isDisabled} className='btn btn-primary'>
      {isDisabled ? `Wait ${countdown}s` : 'Resend OTP'}
    </button>
  );
}

export default DelayedButton;