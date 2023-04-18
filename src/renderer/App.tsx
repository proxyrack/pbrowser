import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Pages
import Main from './pages/main';

// styles
import GlobalStyles from './styles/globalStyles';
import theme from './styles/theme';

export default function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}
