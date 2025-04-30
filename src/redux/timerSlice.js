import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workDuration: 25,  // Store in minutes
  breakDuration: 5,  // Store in minutes
  timeLeft: 25 * 60, // Start with work duration in seconds
  isRunning: false,
  pomodoros: 0,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer(state) {
      state.isRunning = true;
    },

    resetTimer(state) {
      state.isRunning = false;
      state.timeLeft = state.workDuration * 60; // Reset to work duration in seconds
    },
    tick(state) {
      if (state.isRunning) {
        if (state.timeLeft > 0) {
          state.timeLeft -= 1;
        }
        if (state.timeLeft === 0) {
          state.isRunning = false;
          state.pomodoros += 1;
        }
      }
    }
    ,
    setWorkDuration(state, action) {
      state.workDuration = action.payload; // Store in minutes
      state.timeLeft = state.workDuration * 60; // Reset timeLeft when work duration changes
    },
    setBreakDuration(state, action) {
      state.breakDuration = action.payload; // Store in minutes
    },
  },
});

export const { startTimer, resetTimer, tick, setWorkDuration, setBreakDuration } = timerSlice.actions;
export default timerSlice.reducer;
