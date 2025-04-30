import React from 'react';
import { useDispatch, useSelector } from 'react-redux';  // <-- Make sure this is correct
import { toggleTheme } from '../redux/themeSlice';

const ToggleTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // <-- Access the theme state

  return (
    <button className="theme-toggle" onClick={() => dispatch(toggleTheme())}>
      {theme === 'dark' ? 'Light ☀️' : 'Dusky 🌙'}
    </button>
  );
};

export default ToggleTheme;
