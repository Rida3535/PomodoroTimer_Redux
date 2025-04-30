import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, resetTimer, tick } from '../redux/timerSlice';

const Timer = () => {
  const dispatch = useDispatch();
  const { timeLeft, isRunning, pomodoros } = useSelector((state) => state.timer);

  // Ref to track the timeout ID so we can clear it properly
  const timeoutRef = useRef(null);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (isRunning) {
      // If timer is running, set a timeout to dispatch tick every second
      timeoutRef.current = setTimeout(() => {
        dispatch(tick()); // Dispatch tick every second
      }, 1000);
    } else {
      // Clear timeout when the timer is paused
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null; // Reset the timeoutRef to null
      }
    }

    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isRunning, dispatch, timeLeft]); // Dependency on timeLeft to keep track of updates

  const handleStart = () => {
    console.log('Starting Timer');
    dispatch(startTimer());
  };

  const handleReset = () => {
    console.log('Resetting Timer');
    dispatch(resetTimer());
  };

  return (
    <>
      <div id="time">{formatTime(timeLeft)}</div>
      <div>
        <button
          id="startBtn"
          onClick={handleStart}
          disabled={isRunning} // Disable start when timer is running
        >
          Start
        </button>
        <button
          id="resetBtn"
          onClick={handleReset}
          disabled={!isRunning} // Disable reset when timer is not running
        >
          Reset
        </button>
      </div>

      {/* Completed Pomodoros */}
      <div className="small" id="cycles">
        Completed Pomodoros: {pomodoros}
      </div>
    </>
  );
};

export default Timer;
