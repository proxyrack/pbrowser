import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/app-layout';
import ManageProfileLayout from './layouts/manage-profile-layout';
import CommingSoon from './pages/comming-soon';
import OverviewPage from './pages/overview-page';
import ProfilesListPage from './pages/profiles-list-page';
import ScrollToTop from './components/ui/scroll-to-top';

const AppRouting = () => {
  return (
    <Router>
      <ScrollToTop />
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
          <Route path="/profiles/:id/edit">
            <Route index path="overview" element={<OverviewPage />} />
            <Route path="proxy" element={<CommingSoon />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouting;
