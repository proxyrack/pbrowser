import { ThemeProvider } from 'styled-components';
import { ModalProvider } from 'styled-react-modal';
import IPCConnect from './ipc/IpcConnect';
import { MountPoint, FadingBackground } from './components/ui/confirm-dialog';

// styles
import GlobalStyles from './styles/globalStyles';
import theme from './styles/theme';
import ToastContainerStyled from './components/ui/toast-container-styled';

// store
import { StoreProvider, AppStore } from './store';
import AppRouting from './AppRouting';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContainerStyled />
      <ModalProvider backgroundComponent={FadingBackground}>
        <MountPoint />
        <StoreProvider value={new AppStore()}>
          <IPCConnect>
            <AppRouting />
          </IPCConnect>
        </StoreProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}
