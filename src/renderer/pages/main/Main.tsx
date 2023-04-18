import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from 'renderer/store';
import { pingRequest } from 'renderer/ipc/ipcMain';
import BasicLayout from 'renderer/layouts/basicLayout';

const Main = observer(() => {
  const { secondsPassed } = useStore();

  useEffect(() => {
    pingRequest();
  }, []);

  return (
    <BasicLayout>
      <div>Main Page - {secondsPassed} </div>
    </BasicLayout>
  );
});

export default Main;
