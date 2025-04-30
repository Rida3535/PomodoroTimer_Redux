import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWorkDuration, setBreakDuration } from '../redux/timerSlice';
import ToggleTheme from './ToggleTheme';

const Settings = () => {
  const dispatch = useDispatch();
  const { workDuration, breakDuration, isRunning } = useSelector((state) => state.timer);

  const handleWorkDurationChange = (e) => {
    if (!isRunning) { // Only allow changes if the timer is not running
      const value = Math.min(Math.max(Number(e.target.value), 1), 60); // Ensure value is between 1 and 60
      dispatch(setWorkDuration(value)); // Store as minutes
    }
  };

  const handleBreakDurationChange = (e) => {
    if (!isRunning) { // Only allow changes if the timer is not running
      const value = Math.min(Math.max(Number(e.target.value), 1), 30); // Ensure value is between 1 and 30
      dispatch(setBreakDuration(value)); // Store as minutes
    }
  };

  const handleKeyDown = (e, type) => {
    if (!isRunning) { // Only allow key events if the timer is not running
      // Check for Arrow Up (Increase) and Arrow Down (Decrease) keys
      if (e.key === 'ArrowUp') {
        if (type === 'work') {
          dispatch(setWorkDuration(workDuration + 1));
        } else {
          dispatch(setBreakDuration(breakDuration + 1));
        }
      } else if (e.key === 'ArrowDown') {
        if (type === 'work') {
          dispatch(setWorkDuration(workDuration - 1));
        } else {
          dispatch(setBreakDuration(breakDuration - 1));
        }
      }
    }
  };

  return (
    <div className="settings">
      <div className="form-group">
        <label>
          Work 
          <input
            type="number"
            value={workDuration} // Display minutes
            onChange={handleWorkDurationChange}
            onKeyDown={(e) => handleKeyDown(e, 'work')} // Handle keyboard events for work duration
            min="1"
            max="60"
            disabled={isRunning} // Disable input when the timer is running
          />{" "}
          min
        </label>
    
        <label>
          Break 
          <input
            type="number"
            value={breakDuration} // Display minutes
            onChange={handleBreakDurationChange}
            onKeyDown={(e) => handleKeyDown(e, 'break')} // Handle keyboard events for break duration
            min="1"
            max="30"
            disabled={isRunning} // Disable input when the timer is running
          />{" "}
          min
        </label>
      </div>
    </div>
  );
};

export default Settings;
