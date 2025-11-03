import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggleButton: React.FC = () => { //кнопка перемикання теми
  const { mode, toggleTheme } = useTheme();  //отримуємо поточний режим та функцію перемикання з контексту

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      style={{
        padding: '0.5rem 0.75rem',
        borderRadius: 6,
        border: '1px solid var(--muted, #ccc)',
        background: 'var(--button-bg, #fff)',
        color: 'var(--button-text, #000)',
        cursor: 'pointer'
      }}
    >
      {mode === 'light' ? ' Light' : ' Dark'}
    </button>
  );
};

export default ThemeToggleButton;
