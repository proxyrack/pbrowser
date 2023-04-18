import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// Pages
import Main from './pages/main';

// styles
import GlobalStyles from './styles/globalStyles';
import theme from './styles/theme';

// store
import { StoreProvider, AppStore } from './store';

export default function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StoreProvider value={new AppStore()}>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>
          </Router>
        </StoreProvider>
      </ThemeProvider>
    </div>
  );
}
