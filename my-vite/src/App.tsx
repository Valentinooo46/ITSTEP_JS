import './App.css';
import { CategoryList } from './CategoryList';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggleButton from './components/ThemeToggleButton';

function App() {   //голвний компонент додатку
  return (
    <ThemeProvider>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, alignItems: 'center', marginBottom: 12 }}> 
        <ThemeToggleButton />
      </div>
      <CategoryList />
    </ThemeProvider>
  );
}

export default App;
