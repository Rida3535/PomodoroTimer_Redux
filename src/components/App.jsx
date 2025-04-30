import React, { useEffect } from 'react';
import Timer from './Timer';
import Settings from './Settings';
import ToggleTheme from './ToggleTheme';
import { useSelector, useDispatch } from 'react-redux';
import { tick } from '../redux/timerSlice'; // IMPORTANT
import '../index.css';

const App = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dusky' : '');
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
    <ToggleTheme />
    <div className="container">
      {theme === 'light' ? <div className="sun"></div> : <div className="moon"></div>}
      <div className="card">
        <h1>Pomodoro</h1>
        <Timer />
        <Settings />
      </div>
    </div>
    </>
  );
};

export default App;
