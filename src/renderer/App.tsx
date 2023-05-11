import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import IPCConnect from './ipc/IpcConnect';
import AppLayout from './layouts/app-layout';
import ManageProfileLayout from './layouts/manage-profile-layout';

// Pages
import ProfilesListPage from './pages/profiles-list-page';
import CommingSoon from './pages/comming-soon';
import OverviewPage from './pages/overview-page';

// styles
import GlobalStyles from './styles/globalStyles';
import theme from './styles/theme';

// store
import { StoreProvider, AppStore } from './store';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StoreProvider value={new AppStore()}>
        <IPCConnect>
          <Router>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index path="/" element={<ProfilesListPage />} />
                <Route path="/settings" element={<CommingSoon />} />
                <Route path="/support" element={<CommingSoon />} />
              </Route>
              <Route element={<ManageProfileLayout />}>
                <Route path="/profiles/new">
                  <Route index path="overview" element={<OverviewPage />} />
                  <Route path="proxy" element={<CommingSoon />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </IPCConnect>
      </StoreProvider>
    </ThemeProvider>
  );
}
