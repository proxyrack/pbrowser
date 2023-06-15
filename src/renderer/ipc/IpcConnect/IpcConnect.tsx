import { useEffect } from 'react';
import { useStore } from 'renderer/store';

type IpcConnectProps = {
  children: JSX.Element;
};

const IpcConnect = ({ children }: IpcConnectProps) => {
  const { updateStatus, confirmAppClose } = useStore();

  useEffect(() => {
    window.electron.api.handleStatusChange((event, status) => {
      updateStatus(status);
    });
    window.electron.api.handleAppCloseAttempt(confirmAppClose);

    return () => {
      window.electron.api.removeAllListeners();
    };
  }, [updateStatus, confirmAppClose]);

  return children;
};

export default IpcConnect;
